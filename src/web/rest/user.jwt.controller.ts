import { Body, Controller, Get, Logger, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AccountDTO } from '../../service/dto/account.dto';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { AuthService } from '../../service/auth.service';
const Strava = require('strava-v3');

@Controller('api/v1')
@UseInterceptors(LoggingInterceptor)
@ApiTags('Authentication and Authorization')
export class UserJWTController {
    logger = new Logger('Authentication and Authorization');

    constructor(private readonly authService: AuthService) { }

    @Get('/strava')
    @ApiOperation({ summary: 'Login with strava' })
    @UseGuards(AuthGuard('strava'))
    async stravaSignin(@Req() req: any, @Res() res: Response): Promise<any> {
        res.setHeader('Authorization', 'Bearer ' + req.user.token);
        return res.json(req.user);
    }

    @Get('/strava/callback')
    @UseGuards(AuthGuard('strava'))
    @ApiOperation({ summary: 'Strava Authorization Callback API' })
    async stravaAuthRedirect(@Req() req, @Res() res: Response) {
        const strava = new Strava.client(req.user.profile.accessToken);
        const newActivity = await strava.activities.create({
            name: req.user.profile.firstName + new Date().getTime(),
            type: "Ride",
            distance: 1000,
            elapsed_time: 500,
            start_date_local: new Date()
        })
        const activities = await strava.athlete.listActivities({})
        await this.authService.syncActivities(activities)
        return res.redirect(process.env.SITE_URL + '?token=' + req.user.profile.accessToken + '&athlete_id=' + req.user.profile.id)
    }
}
