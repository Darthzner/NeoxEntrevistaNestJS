import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './users/user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { SendgridController } from './sendgrid/sendgrid.controller'
import { UserService } from './users/user.service';
import { SendgridService } from './sendgrid/sendgrid.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { HealthModule } from './health/health.module';
import { HttpModule } from '@nestjs/axios';
import { PrismaClient } from '@prisma/client';
import { DbUtils } from './utils/db.utils';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({      
      secret: '090B0C4FBA799111722B906E764690E045DD070115F4D175B1280904F9D9C6EF',
      signOptions: { expiresIn: '30m' },
    }),
    HealthModule,
    HttpModule,
  ],
  
  controllers: [
    AuthController,
    UserController,
    SendgridController, 
    AppController       
  ],
  providers: [
    PrismaService,
    AuthService,
    UserService,
    SendgridService,
    JwtStrategy,
    PrismaClient,
    AppService,
    DbUtils
  ],
})
export class AppModule {}
