import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CardsService } from '../services/cards.service';
import { TodoListItemDto } from '@common/interfaces';
import { CheckAndParseIdInterceptor, NotFoundInterceptor } from '../../core/interceptors';
import { PollStatusEnum } from '../constants/poll.constant';

const mockDate: Date = new Date('2222/2/22');
const mockId = 'mockId';
const todoListItem1: TodoListItemDto = {
    id: 'mockId1',
    createdAt: mockDate,
    description: 'mockDescription1',
    pollStatus: PollStatusEnum.NEW
};
const todoListItem2: TodoListItemDto = {
    id: 'mockId2',
    createdAt: mockDate,
    description: 'mockDescription2',
    pollStatus: PollStatusEnum.NEW
};

describe('CardsController', () => {
    let testingModule: TestingModule;
    let controller: CardsController;
    let cardsService: CardsService;

    beforeEach(async () => {
        testingModule = await Test.createTestingModule({
            controllers: [CardsController],
            providers: [
                { provide: CardsService, useValue: {} },
                { provide: APP_INTERCEPTOR, useClass: NotFoundInterceptor },
                { provide: APP_INTERCEPTOR, useClass: CheckAndParseIdInterceptor },
            ],
        }).compile();

        controller = testingModule.get<CardsController>(CardsController);
        cardsService = testingModule.get<CardsService>(CardsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAll', () => {
        let todoListItems: TodoListItemDto[];

        beforeEach(() => {
            todoListItems = [todoListItem1, todoListItem2];

            cardsService.getAll = jest.fn().mockResolvedValue(todoListItems);
        });

        it('should call cardsService getAll', async () => {
            await controller.getAll();

            expect(cardsService.getAll).toHaveBeenCalled();
        });

        it('should return all todo items', async () => {
            const result = await controller.getAll();

            expect(result).toEqual(todoListItems);
        });
    });

    describe('getOne', () => {
        beforeEach(() => {
            cardsService.getOne = jest.fn().mockResolvedValue(todoListItem1);
        });

        it('should call cardsService getOne', async () => {
            await controller.getOne(mockId as any);

            expect(cardsService.getOne).toHaveBeenCalledWith(mockId);
        });

        it('should return todo item', async () => {
            const result = await controller.getOne(mockId as any);

            expect(result).toEqual(todoListItem1);
        });
    });

    describe('createCard', () => {
        let todoListItems: TodoListItemDto[];

        beforeEach(() => {
            todoListItems = [todoListItem1, todoListItem2];

            cardsService.createCard = jest.fn().mockResolvedValue(todoListItems);
        });

        it('should call cardsService createCard', async () => {
            await controller.createCard('mockDescription');

            expect(cardsService.createCard).toHaveBeenCalledWith('mockDescription');
        });

        it('should return all todo items', async () => {
            const result = await controller.createCard('mockDescription');

            expect(result).toEqual(todoListItems);
        });
    });

    describe('updateCard', () => {
        beforeEach(() => {
            cardsService.updateCard = jest.fn().mockResolvedValue(todoListItem2);
        });

        it('should call cardsService updateCard', async () => {
            await controller.updateCard(todoListItem1);

            expect(cardsService.updateCard).toHaveBeenCalledWith(todoListItem1);
        });

        it('should return todo item', async () => {
            const result = await controller.updateCard(todoListItem1);

            expect(result).toEqual(todoListItem2);
        });
    });

    describe('deleteCard', () => {
        let todoListItems: TodoListItemDto[];

        beforeEach(() => {
            todoListItems = [todoListItem1, todoListItem2];

            cardsService.deleteCard = jest.fn().mockResolvedValue(todoListItems);
        });

        it('should call cardsService deleteCard', async () => {
            await controller.deleteCard(mockId as any);

            expect(cardsService.deleteCard).toHaveBeenCalledWith(mockId);
        });

        it('should return all todo items', async () => {
            const result = await controller.deleteCard(mockId as any);

            expect(result).toEqual(todoListItems);
        });
    });
});
