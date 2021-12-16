import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ActivityDocument = Activity & Document;

@Schema({ timestamps: true, bufferCommands: false })
export class Activity {
    @Prop({ unique: true })
    id: number;

    @Prop()
    name?: string;

    @Prop()
    type?: string;

    @Prop()
    distance?: number;

    @Prop()
    start_date?: Date;

    @Prop({ type: { id: Number, resource_state: Number } })
    athlete: any

}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
