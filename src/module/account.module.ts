import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '../schemas/account.schema';
import { AccountService } from '../service/account.service';
import { AccountController } from '../web/rest/account.controller';

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }])
    ],
    controllers: [AccountController],
    providers: [AccountService],
    exports: [AccountService],
})
export class AccountModule { }
