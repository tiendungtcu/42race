import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../security/payload.interface';
import { AccountService } from '../service/account.service';
import { ActivityService } from './activity.service';
import { AccountDTO } from './dto/account.dto';
const validator = require('validator');
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    logger = new Logger('AuthService');
    constructor(
        private readonly jwtService: JwtService,
        private accountService: AccountService,
        private activityService: ActivityService
    ) { }

    async login(userLogin: any): Promise<any> {
        const loginUserName = userLogin.username;
        const loginPassword = userLogin.password;
        const userFind: any = await this.accountService.findByfields({ login: loginUserName });

        if (!userFind?._id) {
            throw new HttpException({ message: 'Email/username/phone number not found!', code: 1000 }, HttpStatus.BAD_REQUEST);
        }
        const isPwCorrect = bcrypt.compareSync(loginPassword, userFind.password)
        if (!isPwCorrect) {
            throw new HttpException({ message: 'Invalid password.', code: 1001 }, HttpStatus.BAD_REQUEST);
        }

        const payload: Payload = {
            id: userFind._id.toHexString(),
            firstName: userFind.firstName
        };

        return {
            id_token: this.jwtService.sign(payload),
            profile: userFind
        };
    }

    async validateUser(payload: Payload): Promise<AccountDTO | undefined> {
        return await this.accountService.findById(payload.id);
    }

    async syncActivities(activities: any): Promise<void> {
        return await this.activityService.saveMany(activities);
    }


}
