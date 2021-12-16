import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from '../schemas/activity.schema';
import { AccountDTO } from './dto/account.dto';

@Injectable()
export class ActivityService {
    constructor(@InjectModel(Activity.name) private activityModel: Model<ActivityDocument>) { }

    async findById(id: number): Promise<any> {
        const result: any = await this.activityModel.findOne({ id });
        return result;
    }

    async findByfields(options: any): Promise<AccountDTO | undefined> {
        const result: any = await this.activityModel.findOne(options);
        return result?._doc
    }

    async find(options: any): Promise<AccountDTO | undefined> {
        const result: any = await this.activityModel.findOne(options);
        return result._doc
    }

    async findAndCount(options: any): Promise<[Activity[], number]> {
        const resultList = await this.findMany(options);
        const count = await this.activityModel.count(options);
        return [resultList, count];
    }

    async findMany(options: any): Promise<Activity[]> {
        const resultList = await this.activityModel.find(options,
            {},
            { skip: options.page * options.size, limit: options.size, sort: options.sort });

        return resultList.map((it: any) => { if (it._doc) { return it._doc } else return it })
    }

    async save(AccountDTO: AccountDTO): Promise<any> {
        const result: any = await this.activityModel.create(AccountDTO);
        return result?._doc
    }

    async update(dto: any): Promise<AccountDTO | undefined> {
        const updated: any = await this.activityModel.findByIdAndUpdate(dto.id ?? dto._id, dto);
        return updated?._doc;
    }

    async deleteById(id: number): Promise<any> {
        return await this.activityModel.findOneAndDelete({id});
    }

    async saveMany(activities: Activity[]): Promise<any> {
        let result = {}
        try {
            result = await this.activityModel.insertMany(activities, { ordered: false });
        } catch (e) {

        }
        return result

    }

}
