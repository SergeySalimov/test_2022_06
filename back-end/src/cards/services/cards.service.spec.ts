import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { TodoListItemDto } from '@common/interfaces';

const crypto = require('crypto');

const mockDate = new Date('2222/2/22');
const mockId = 'mockId';
const todoListItem1: TodoListItemDto = { id: 'mockId1', createdAt: mockDate, description: 'mockDescription1' };
const todoListItem2: TodoListItemDto = { id: 'mockId2', createdAt: mockDate, description: 'mockDescription2' };
const todoItems: TodoListItemDto[] = [todoListItem1, todoListItem2];

describe('CardsService', () => {
    let service: CardsService;

    beforeEach(async () => {
        const testingModule: TestingModule = await Test.createTestingModule({
            providers: [CardsService],
        }).compile();

        service = testingModule.get<CardsService>(CardsService);
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any); // to make new Date() returns everytime the same date
        jest.spyOn(crypto, 'randomUUID').mockImplementation(() => mockId as any); // the same for crypto.randomUUID()
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAll', () => {
        beforeEach(() => {
            service.todoItems = [...todoItems];
        });

        it('should return todoItems', async () => {
            const result = await service.getAll();

            expect(result).toEqual(todoItems);
        });
    });

    describe('getOne', () => {
        beforeEach(() => {
            service.todoItems = [...todoItems];
        });

        it('should return todoItem', async () => {
            const result = await service.getOne('mockId1');

            expect(result).toEqual(todoListItem1);
        });

        it('should return undefined if nothing was found', async () => {
            const result = await service.getOne('notPresentId');

            expect(result).toBeUndefined();
        });
    });

    describe('createCard', ()=> {
        const description = 'some description';

        beforeEach(() => {
            service.todoItems = [];
        });

        it('should create card and return all cards', async () => {
            const result = await service.createCard(description);

            expect(result).toEqual([{ description, id: mockId, createdAt: mockDate }]);
        });
    });

    describe('updateCard', () => {
        const todoItemOld: TodoListItemDto = { id: 'mockId', createdAt: mockDate, description: 'mockDescription' };
        const todoItemNew: TodoListItemDto = { id: 'mockId', createdAt: mockDate, description: 'new mockDescription' };

        beforeEach(() => {
            service.todoItems = [todoListItem1, todoItemOld, todoListItem2];
        });

        it('should update card', async () => {
            const result = await service.updateCard(todoItemNew);

            expect(result).toEqual(todoItemNew);
        });

        it('should return null if there is no item', async () => {
            service.todoItems = [todoListItem1, todoListItem2];

            const result = await service.updateCard(todoItemNew);

            expect(result).toBeNull();
        });
    });

    describe('deleteCard', () => {
        beforeEach(() => {
            service.todoItems = [todoListItem1, todoListItem2, { id: 'toDelete', createdAt: mockDate, description: 'mock' }];
        });

        it('should delete item', async () => {
            const result = await service.deleteCard('toDelete');

            expect(result).toEqual([todoListItem1, todoListItem2]);
        });

        it('should return null if item was not found', async () => {
            const result = await service.deleteCard('unknown id');

            expect(result).toBeNull();
        });
    });
});
