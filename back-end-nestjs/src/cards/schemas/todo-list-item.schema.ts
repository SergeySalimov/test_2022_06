import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PollStatusEnum } from '../constants/poll.constant';

export type TodoListItemDocument = TodoListItem & Document;

@Schema()
export class TodoListItem {
    @Prop({ required: true }) description: string;
    @Prop({ required: true }) createdAt: Date;
    @Prop({ required: false }) pollStatus: PollStatusEnum;
    @Prop({ required: false }) id: string;
    @Prop({ required: false }) name: string;
    @Prop({ required: false }) surname: string;
    @Prop({ required: false }) patronymic: string;
    @Prop({ required: false }) email: string;
    @Prop({ required: false }) phone: string;
    @Prop({ required: false }) zipCode: number;
    @Prop({ required: false }) city: string;
    @Prop({ required: false }) address: string;
    @Prop({ required: false }) notes: string;
}

export const TodoListItemSchema = SchemaFactory.createForClass(TodoListItem);
