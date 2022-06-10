import { Injectable } from '@nestjs/common';
import { PollStatusListDto, TodoListItemDto } from '@common/interfaces';
import { Cron, CronExpression } from '@nestjs/schedule';
import { INTERVAL_TO_CHANGE_STATUS, PollStatusEnum } from '../constants/poll.constant';

const crypto = require('crypto');

@Injectable()
export class CardsService {
    todoItems: TodoListItemDto[] = [];

    async getAll(): Promise<TodoListItemDto[]> {
        return this.todoItems;
    }

    async getOne(id: string): Promise<TodoListItemDto> {
        return this.todoItems.find(todo => todo.id === id);
    }

    async createCard(description: string): Promise<TodoListItemDto[]> {
        this.todoItems.push({
            description,
            createdAt: new Date(),
            id: crypto.randomUUID(),
            pollStatus: PollStatusEnum.NEW,
        });

        return this.todoItems;
    }

    async updateCard(card: TodoListItemDto): Promise<TodoListItemDto> {
        const indexOfTodo: number = this.todoItems.findIndex(todo => todo.id === card.id);

        if (indexOfTodo === -1) {
            return null;
        }

        this.todoItems[indexOfTodo] = { ...card };

        return this.todoItems[indexOfTodo];
    }

    async deleteCard(id: string): Promise<TodoListItemDto[]> {
        const indexOfTodo: number = this.todoItems.findIndex(todo => todo.id === id);

        if (indexOfTodo === -1) {
            return null;
        }

        this.todoItems.splice(indexOfTodo, 1);

        return this.todoItems;
    }

    @Cron(CronExpression.EVERY_5_SECONDS)
    updatePollStatus(): void {
        const currentTime: number = new Date().getTime();
        const changedTime: number = currentTime - INTERVAL_TO_CHANGE_STATUS;
        const expiredTime: number = changedTime - INTERVAL_TO_CHANGE_STATUS;

        for (const todo of this.todoItems) {
            if (!('pollStatus' in todo)) {
                todo.pollStatus = PollStatusEnum.EXPIRED;
                continue;
            }

            if (todo.pollStatus === PollStatusEnum.EXPIRED) {
                continue;
            }

            const todoCreatedAt: number = new Date(todo.createdAt).getTime();

            if (todoCreatedAt < expiredTime) {
                todo.pollStatus = PollStatusEnum.EXPIRED;
                continue;
            }

            if (todoCreatedAt < changedTime) {
                todo.pollStatus = PollStatusEnum.CHANGED;
            }
        }
    }

    async getPollStatus(cardIds: string[]): Promise<PollStatusListDto[]> {
        return this.todoItems
            .filter(({ id }) => cardIds.includes(id))
            .map(({ id, pollStatus }) => ({ id, pollStatus}));
    }
}
