import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strava-oauth2';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { AccountService } from '../service/account.service';
import { JwtService } from '@nestjs/jwt';
import { Account } from '../schemas/account.schema';
import { Payload } from './payload.interface';

config();

@Injectable()
export class StravaStrategy extends PassportStrategy(Strategy, 'strava') {

  constructor(
    private readonly jwtService: JwtService,
        private accountService: AccountService
  ) {
    super({
        clientID: '75329',
        clientSecret: 'd6a4ef0fad18cab754a66cc2fe07dd99cb1222a2',
        scope:"activity:read_all,activity:write",
        callbackURL: '/api/v1/strava/callback'
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
    const { name, emails, photos, id, displayName } = profile
    const user = {
      id,
      firstName: name.givenName,
      lastName: name.familyName,
      photo: photos[0].value,
      accessToken,
      refreshToken,
      displayName
    }
    const account: Account = await this.accountService.findOrCreateAccount(user);
    const payload: Payload = { id: user.id, firstName: account.firstName};

    const jwt: string = this.jwtService.sign(payload);
    done(null, { token: jwt, profile: account });
  }
}