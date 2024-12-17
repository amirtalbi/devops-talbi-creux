import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from 'src/jwt-service/jwt-service.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { UserDocument } from 'src/users/schemas/user.schema'; // Assurez-vous d'importer UserDocument

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string; userId: string }> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const payload = { sub: user._id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, userId: user._id.toString() };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; userId: string }> {
    const user: UserDocument | null = await this.usersService.findOne({
      email: loginDto.email,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user._id.toString(), email: user.email }; // Utilisez toString() si nécessaire
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, userId: user._id.toString() };
  }
}
