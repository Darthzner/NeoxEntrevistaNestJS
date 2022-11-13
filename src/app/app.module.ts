import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './users/user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { SendgridController } from './sendgrid/sendgrid.controller'
import { UserService } from './users/user.service';
import { SendgridService } from './sendgrid/sendgrid.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [
    AuthController,
    UserController,
    SendgridController,
  ],
  providers: [
    PrismaService,
    AuthService,
    UserService,
    SendgridService,
    JwtStrategy,
  ],
})
export class AppModule {}
