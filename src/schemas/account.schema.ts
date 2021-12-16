import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type AccountDocument = Account & Document;

@Schema({ timestamps: true, bufferCommands: false })
export class Account {
    @Prop({ unique: true })
    id: number;

    @Prop()
    firstName?: string;

    @Prop()
    displayName?: string;

    @Prop()
    lastName?: string;

    @Prop()
    photo?: string;

    @Prop()
    accessToken?: string;

    @Prop()
    refreshToken?: string;

}

export const AccountSchema = SchemaFactory.createForClass(Account);
