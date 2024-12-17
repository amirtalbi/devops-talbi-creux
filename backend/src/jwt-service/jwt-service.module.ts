import { Module } from '@nestjs/common';
import { JwtService } from './jwt-service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtServiceModule {}
