import { Injectable } from '@nestjs/common';
import { TodoListItemDto } from '@common/interfaces';

const crypto = require('crypto');

@Injectable()
export class CardsService {
    todoItems: TodoListItemDto[] = [];

    getAll(): TodoListItemDto[] {
        return this.todoItems;
    }

    getOne(id: string): TodoListItemDto {
        return this.todoItems.find(todo => todo.id === id);
    }

    createCard(description: string): TodoListItemDto[] {
        this.todoItems.push({ description, createdAt: new Date(), id: crypto.randomUUID() });

        return this.todoItems;
    }

    updateCard(card: TodoListItemDto): TodoListItemDto {
        const indexOfTodo: number = this.todoItems.findIndex(todo => todo.id === card.id);

        return indexOfTodo === -1 ? null : this.todoItems[indexOfTodo] = { ...card }, card;
    }

    deleteCard(id: string): TodoListItemDto[] {
        const indexOfTodo: number = this.todoItems.findIndex(todo => todo.id === id);

        return indexOfTodo === -1 ? null : this.todoItems.splice(indexOfTodo, 1), this.todoItems;
    }
}
