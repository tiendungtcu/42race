import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MSchema } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true, bufferCommands: false })
export class User {
    @Prop({ unique: true })
    login: string;

    @Prop()
    firstName?: string;

    @Prop()
    fullName?: string;

    @Prop()
    lastName?: string;

    @Prop()
    email: string;

    @Prop({ type: MSchema.Types.Mixed })
    address: any;

    @Prop()
    phone: string;

    @Prop()
    activated?: boolean;

    @Prop()
    langKey?: string;

    @Prop({ type: [String] })
    authorities?: any;


}

export const UserSchema = SchemaFactory.createForClass(User);
