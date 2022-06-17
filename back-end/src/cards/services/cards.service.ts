import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, PipelineStage } from 'mongoose';
import { IFilter, PollStatusListDto, StatusEnumDto, TodoListItemDto } from '@common/interfaces';
import { INTERVAL_TO_CHANGE_STATUS, PollStatusEnum } from '../constants/poll.constant';
import { TodoListItem, TodoListItemDocument } from '../schemas/todo-list-item.schema';

@Injectable()
export class CardsService {
    constructor(@InjectModel(TodoListItem.name) private todoListItemModel: Model<TodoListItemDocument>) {}

    async getAll(): Promise<TodoListItemDto[]> {
        // return this.todoListItemModel.aggregate([
        //     { $addFields: { id: { $toString: '$_id' } } },
        //     { $unset: ['__v', '_id'] }
        // ]);
        const todos: TodoListItem[] = await this.todoListItemModel.find({});

        return todos.map(this.mapToDto);
    }

    async getOne(id: mongoose.Types.ObjectId): Promise<TodoListItemDto> {
        const todoItem: TodoListItem = await this.todoListItemModel.findById(id);

        return todoItem ? this.mapToDto(todoItem) : null;
    }

    async getFiltered(filters: IFilter): Promise<TodoListItemDto[]> {
        const pipeline: PipelineStage[] = [
            { $addFields: { id: { $toString: '$_id' } } },
            { $unset: ['__v', '_id'] }
        ];

        if (filters.description) {
            pipeline.unshift({ $match: { 'description': { $regex: filters.description } } });
        }

        if (filters.dateFrom) {
            const dateFrom: Date = new Date(filters.dateFrom);
            pipeline.unshift({ $match: { 'createdAt': { $gte: dateFrom } } });
        }

        if (filters.dateTill) {
            const dateTill: Date = new Date(filters.dateTill);
            pipeline.unshift({ $match: { 'createdAt': { $lte: dateTill } } });
        }

        if (filters.status) {
            const pollStatus = +filters.status;
            pipeline.unshift({ $match: { 'pollStatus': pollStatus } });
        }

        return this.todoListItemModel.aggregate(pipeline);
    }

    async createCard(description: string): Promise<TodoListItemDto> {
        const todoItem: TodoListItem = await new this.todoListItemModel({
            description,
            createdAt: new Date(),
            pollStatus: PollStatusEnum.NEW,
        }).save();

        return this.mapToDto(todoItem);
    }

    async updateCard(todoListItemDto: TodoListItemDto): Promise<TodoListItemDto> {
        const todoItem: TodoListItem = await this.todoListItemModel.findByIdAndUpdate(todoListItemDto.id, todoListItemDto);

        return todoItem ? this.mapToDto(todoItem) : null;
    }

    async deleteCard(id: mongoose.Types.ObjectId): Promise<TodoListItemDto> {
        const todoItem: TodoListItem = await this.todoListItemModel.findByIdAndRemove(id);

        return todoItem ? this.mapToDto(todoItem) : null;
    }

    @Cron(CronExpression.EVERY_5_SECONDS)
    async updatePollStatus(): Promise<void> {
        const currentTime: number = Date.now();
        const changedLimit: Date = new Date(currentTime - INTERVAL_TO_CHANGE_STATUS);
        const expiredLimit: Date = new Date(currentTime - 2 * INTERVAL_TO_CHANGE_STATUS);

        // elements to set changed status
        await this.todoListItemModel.updateMany(
            { createdAt: { $gte: expiredLimit, $lt: changedLimit }, pollStatus: PollStatusEnum.NEW },
            { $set: { pollStatus: PollStatusEnum.CHANGED } }
        );

        // elements to set expired status
        await this.todoListItemModel.updateMany(
            { createdAt: { $lt: expiredLimit }, pollStatus: [PollStatusEnum.NEW, PollStatusEnum.CHANGED] },
            { $set: { pollStatus: PollStatusEnum.EXPIRED } }
        );
    }

    async getPollStatus(cardIds: string[]): Promise<PollStatusListDto[]> {
        const ids: mongoose.Types.ObjectId[] = cardIds.map(id => new mongoose.Types.ObjectId(id));

        return this.todoListItemModel.aggregate([
            { $match: { '_id': { '$in': ids } } },
            { $project: { pollStatus: 1, '_id': 0, id: { $toString: '$_id' } } }
        ]);
    }

    async getStatusEnum(): Promise<StatusEnumDto[]> {
        return Object.keys(PollStatusEnum)
            .filter(value => isNaN(Number(value)))
            .map(enumKey => ({ key: enumKey, value: PollStatusEnum[enumKey] }));
    }

    mapToDto(todoListItem: TodoListItem): TodoListItemDto {
        return {
            id: (todoListItem as any)._id.toString(),
            createdAt: todoListItem.createdAt,
            pollStatus: todoListItem.pollStatus,
            description: todoListItem.description,
            name: todoListItem?.name ?? null,
            surname: todoListItem?.surname ?? null,
            patronymic: todoListItem?.patronymic ?? null,
            email: todoListItem?.email ?? null,
            phone: todoListItem?.phone ?? null,
            zipCode: todoListItem?.zipCode ?? null,
            city: todoListItem?.city ?? null,
            address: todoListItem?.address ?? null,
            notes: todoListItem?.notes ?? null,
        };
    }
}
