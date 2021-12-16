import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { StravaStrategy } from '../security/strava.strategy';
import { config } from '../config';
import { AccountModule } from './account.module';
import { AuthService } from '../service/auth.service';
import { AccountController } from '../web/rest/account.controller';
import { UserJWTController } from '../web/rest/user.jwt.controller';
import { JwtStrategy } from '../security/passport.jwt.strategy';
import { ActivityModule } from './activity.module';


@Module({
    imports: [
        AccountModule,
        ActivityModule,
        PassportModule,
        JwtModule.register({
            secret: config['jhipster.security.authentication.jwt.base64-secret'],
            signOptions: { expiresIn: '300s' },
        }),
    ],
    controllers: [UserJWTController, AccountController],
    providers: [AuthService, StravaStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule { }
