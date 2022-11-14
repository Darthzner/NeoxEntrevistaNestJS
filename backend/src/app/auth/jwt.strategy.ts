import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Request } from '@nestjs/common';
import { jwtConstants } from './constants';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '090B0C4FBA799111722B906E764690E045DD070115F4D175B1280904F9D9C6EF',
      passReqToCallback: true
    });
    
  }
  async validate(@Request() req: any,payload: any) {
    req.user = payload.user;
    return { user: payload.user };
  }
  
}