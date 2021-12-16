import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from '../schemas/account.schema';

@Injectable()
export class AccountService {
    constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>) { }

    async findById(id: number): Promise<any> {
        const result: any = await this.accountModel.findOne({id});
        return result?._doc;
    }

    async findOrCreateAccount(account: Account): Promise<Account> {
        let result: any = await this.accountModel.findOne({ id: account.id });
        if (!result) {
            result = await this.accountModel.create(account);
        }
        return result?._doc;
    }

    async findByfields(options: any): Promise<Account | undefined> {
        const result: any = await this.accountModel.findOne(options, { search: 0 });
        return result?._doc
    }

    async find(options: any): Promise<Account | undefined> {
        const result: any = await this.accountModel.findOne(options, { search: 0 });
        return result._doc
    }

    async findAndCount(options: any): Promise<[Account[], number]> {
        const resultList = await this.findMany(options);
        const count = await this.accountModel.count(options);
        return [resultList, count];
    }

    async findMany(options: any): Promise<Account[]> {
        const resultList = await this.accountModel.find(options,
            {},
            { skip: options.page * options.size, limit: options.size, sort: options.sort });

        return resultList.map((it: any) => { if (it._doc) { return it._doc } else return it })
    }

    async save(AccountDTO: Account): Promise<any> {
        const result: any = await this.accountModel.create(AccountDTO);
        return result?._doc
    }

    async update(dto: any): Promise<Account | undefined> {
        const updated: any = await this.accountModel.findByIdAndUpdate(dto.id ?? dto._id, dto);

        return updated?._doc;
    }

}
