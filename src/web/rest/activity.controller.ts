import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod, Req, UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { PageRequest } from '../../domain/base/pagination.entity';
import { Activity } from '../../schemas/activity.schema';
import { ActivityService } from '../../service/activity.service';

@Controller('api/v1/activities')
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('Activities')
export class ActivityController {
    logger = new Logger('ActivityController');

    constructor(
        private readonly activityService: ActivityService,
    ) { }

    @Get('/')
    @ApiOperation({ summary: 'Show activity list' })
    @ApiQuery({ name: 'size', required: false, example: '20', description: 'result size' })
    @ApiQuery({ name: 'athlete.id', required: false, example: '96333938', description: 'athlete id' })
    @ApiQuery({ name: 'type', required: false, example: 'Ride', description: 'Activity type'})
    @ApiQuery({ name: 'sort', required: false, example: 'start_date,desc', description: 'sort by' })
    async getAll(@Req() req: Request): Promise<Activity[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const results = await this.activityService.findMany({
            ...req.query,
            ...pageRequest
        });
        return results;
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Show activity by id' })
    async getOne(@Param('id') id: number): Promise<Activity> {
        return await this.activityService.findById(id);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete Activity by id' })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        return await this.activityService.deleteById(id);
    }
}
