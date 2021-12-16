import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from '../schemas/activity.schema';
import { ActivityService } from '../service/activity.service';
import { ActivityController } from '../web/rest/activity.controller';

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Activity.name, schema: ActivitySchema }])
    ],
    controllers: [ActivityController],
    providers: [ActivityService],
    exports: [ActivityService],
})
export class ActivityModule { }
