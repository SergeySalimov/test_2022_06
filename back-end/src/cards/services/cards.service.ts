import { Injectable } from '@nestjs/common';
import { TodoListItemDto } from '@common/interfaces';

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
        this.todoItems.push({ description, createdAt: new Date(), id: crypto.randomUUID() });

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
}
