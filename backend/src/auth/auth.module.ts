import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtServiceModule } from 'src/jwt-service/jwt-service.module';

@Module({
  imports: [UsersModule, JwtServiceModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
