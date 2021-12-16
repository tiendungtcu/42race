/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Logger, Param, Req, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PageRequest } from '../../domain/base/pagination.entity';
import { Account } from '../../schemas/account.schema';
import { AccountService } from '../../service/account.service';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/v1/accounts')
@UseInterceptors(LoggingInterceptor)
@ApiTags('Accounts')
export class AccountController {
    logger = new Logger('AccountController');

    constructor(
        private readonly accountService: AccountService
    ) { }

    @Get('/')
    @ApiOperation({ summary: 'Show account list' })
    async getAll(@Req() req: Request): Promise<Account[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.accountService.findAndCount({
            ...req.query,
            ...pageRequest
        });
        return results;
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Show account by Id' })
    async getOne(@Param('id') id: number): Promise<Account> {
        return await this.accountService.findById(id);
    }

}
