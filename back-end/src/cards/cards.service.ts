import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TodoListItemDto } from '@common/interfaces';

@Injectable()
export class CardsService {
    todoItems: TodoListItemDto[] = [{
        id: this.makeId(),
        createdAt: new Date(),
        description: 'test',
    }];

    makeId(): string {
        let id = '';
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toLowerCase();
        for ( let i = 0; i < 12; i++ ) {
            id += characters.charAt(Math.floor(Math.random() * 36));
        }

        return id;
    }

    getAll(): TodoListItemDto[] {
        return this.todoItems;
    }

    getOne(id: string): TodoListItemDto|void {
        const indexOfTodo: number = this.todoItems.findIndex(todo => todo.id === id)

        if (indexOfTodo === -1) {
            throw new HttpException('Element was not found', HttpStatus.NOT_FOUND);
        }

        return this.todoItems[indexOfTodo];
    }

    createCard(card: TodoListItemDto): TodoListItemDto[] {
        this.todoItems.push({ ...card, id: this.makeId() });

        return this.todoItems;
    }
}
