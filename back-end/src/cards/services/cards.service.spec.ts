import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { ISort, TodoListItemDto } from '@common/interfaces';
import { PollStatusEnum } from '../constants/poll.constant';
import { TodoListItem, TodoListItemDocument } from '../schemas/todo-list-item.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const mockDate = new Date('2222/2/22');
const mockId = 'mockId';
const todoListItemDto1: TodoListItemDto = {
    id: 'mockId1',
    createdAt: mockDate,
    description: 'mockDescription1',
    pollStatus: PollStatusEnum.NEW
};
const todoListItemDto2: TodoListItemDto = {
    id: 'mockId2',
    createdAt: mockDate,
    description: 'mockDescription2',
    pollStatus: PollStatusEnum.NEW
};
const todoItemsDto: TodoListItemDto[] = [todoListItemDto1, todoListItemDto2];

const todoListItem1: TodoListItemDocument = {
    id: 'mockId1',
    createdAt: mockDate,
    description: 'mockDescription1',
    pollStatus: PollStatusEnum.NEW
} as TodoListItemDocument;
const todoListItem2: TodoListItemDocument = {
    id: 'mockId2',
    createdAt: mockDate,
    description: 'mockDescription2',
    pollStatus: PollStatusEnum.NEW
} as TodoListItemDocument;
const todoItems: TodoListItem[] = [todoListItem1, todoListItem2];

describe('CardsService', () => {
    let service: CardsService;
    let todoListItemModel: Model<TodoListItemDocument>;

    describe('find operations', () => {
        beforeEach(async () => {
            const testingModule: TestingModule = await Test.createTestingModule({
                providers: [
                    CardsService,
                    { provide: getModelToken(TodoListItem.name), useValue: Model },
                ],
            }).compile();

            service = testingModule.get<CardsService>(CardsService);
            todoListItemModel = testingModule.get<Model<TodoListItemDocument>>(getModelToken(TodoListItem.name));
        });

        it('should be defined', () => {
            expect(service).toBeDefined();
        });

        describe('getAll', () => {
            beforeEach(() => {
                todoListItemModel.find = jest.fn().mockResolvedValue([...todoItems]);
                service.mapToDto = jest.fn().mockResolvedValue([...todoItemsDto]);
            });

            it('should call todoListItemModel.find', async () => {
                await service.getAll();
                expect(todoListItemModel.find).toBeCalledWith({});
            });

            it('should map result to Dto', async () => {
                await service.getAll();

                expect(service.mapToDto).toBeCalledTimes(todoItems.length);

                todoItems.forEach((item, index, array) => {
                    expect(service.mapToDto).toHaveBeenCalledWith(item, index, array);
                });
            });
        });

        describe('getOne', () => {
            beforeEach(() => {
                todoListItemModel.findById = jest.fn().mockResolvedValue(todoListItem1);
                service.mapToDto = jest.fn().mockResolvedValue(todoListItemDto1);
            });

            it('should call todoListItemModel.findById', async () => {
                await service.getOne(mockId as any);
                expect(todoListItemModel.findById).toBeCalledWith(mockId);
            });

            it('should map result to Dto', async () => {
                await service.getOne(mockId as any);
                expect(service.mapToDto).toHaveBeenCalledWith(todoListItem1);
            });

            it('should return null if find by id return undefined', async () => {
                todoListItemModel.findById = jest.fn().mockResolvedValue(undefined);
                const result = await service.getOne(mockId as any);

                expect(result).toBeNull();
            });
        });

        describe('getFiltered', () => {
            const mockDescription = 'mock description';
            const pollStatus: PollStatusEnum = PollStatusEnum.NEW;

            beforeEach(() => {
                todoListItemModel.aggregate = jest.fn().mockResolvedValue([...todoItemsDto]);
            });

            it('should call aggregate with default pipeline when all filters are null', async () => {
                await service.getFiltered(
                    { description: null, dateFrom: null, dateTill: null, status: null },
                    {} as ISort,
                );
                expect(todoListItemModel.aggregate).toHaveBeenCalledWith([
                    { $addFields: { id: { $toString: '$_id' } } },
                    { $unset: ['__v', '_id'] }
                ]);
            });

            it('should add pipeline for description if description filter exists', async () => {
                await service.getFiltered(
                    { description: mockDescription, dateFrom: null, dateTill: null, status: null },
                    {} as ISort,
                );
                expect(todoListItemModel.aggregate).toHaveBeenCalledWith([
                    { $match: { 'description': { $regex: mockDescription } } },
                    { $addFields: { id: { $toString: '$_id' } } },
                    { $unset: ['__v', '_id'] }
                ]);
            });

            it('should add pipeline for date from if dateFrom filter exists', async () => {
                await service.getFiltered(
                    { description: null, dateFrom: mockDate, dateTill: null, status: null },
                    {} as ISort,
                );
                expect(todoListItemModel.aggregate).toHaveBeenCalledWith([
                    { $match: { 'createdAt': { $gte: mockDate } } },
                    { $addFields: { id: { $toString: '$_id' } } },
                    { $unset: ['__v', '_id'] }
                ]);
            });

            it('should add pipeline for date till if dateTill filter exists', async () => {
                await service.getFiltered(
                    { description: null, dateFrom: null, dateTill: mockDate, status: null },
                    {} as ISort,
                );
                expect(todoListItemModel.aggregate).toHaveBeenCalledWith([
                    { $match: { 'createdAt': { $lte: mockDate } } },
                    { $addFields: { id: { $toString: '$_id' } } },
                    { $unset: ['__v', '_id'] }
                ]);
            });

            it('should add pipeline for status if status filter exists', async () => {
                await service.getFiltered(
                    { description: null, dateFrom: null, dateTill: null, status: pollStatus },
                    {} as ISort,
                );
                expect(todoListItemModel.aggregate).toHaveBeenCalledWith([
                    { $match: { 'pollStatus': pollStatus } },
                    { $addFields: { id: { $toString: '$_id' } } },
                    { $unset: ['__v', '_id'] }
                ]);
            });

            it('should add all pipelines for all active filters', async () => {
                await service.getFiltered(
                    { description: mockDescription, dateFrom: mockDate, dateTill: null, status: pollStatus },
                    {} as ISort,
                );
                expect(todoListItemModel.aggregate).toHaveBeenCalledWith([
                    { $match: { 'pollStatus': pollStatus } },
                    { $match: { 'createdAt': { $gte: mockDate } } },
                    { $match: { 'description': { $regex: mockDescription } } },
                    { $addFields: { id: { $toString: '$_id' } } },
                    { $unset: ['__v', '_id'] }
                ]);
            });
        });

        describe('updateCard', () => {
            beforeEach(() => {
                todoListItemModel.findByIdAndUpdate = jest.fn().mockResolvedValue(todoListItem2);
                service.mapToDto = jest.fn().mockResolvedValue(todoListItemDto2);
            });

            it('should call todoListItemModel.findByIdAndUpdate', async () => {
                await service.updateCard(todoListItemDto1);
                expect(todoListItemModel.findByIdAndUpdate).toHaveBeenCalledWith(todoListItemDto1.id, todoListItemDto1);
            });

            it('should map result to Dto', async () => {
                await service.updateCard(todoListItemDto1);
                expect(service.mapToDto).toHaveBeenCalledWith(todoListItem2);
            });

            it('should return null if find by id return undefined', async () => {
                todoListItemModel.findByIdAndUpdate = jest.fn().mockResolvedValue(undefined);
                const result = await service.updateCard(todoListItemDto1);
                expect(result).toBeNull();
            });
        });

        describe('deleteCard', () => {
            beforeEach(() => {
                todoListItemModel.findByIdAndRemove = jest.fn().mockResolvedValue(todoListItem1);
                service.mapToDto = jest.fn().mockResolvedValue(todoListItemDto1);
            });

            it('should call todoListItemModel.findByIdAndRemove', async () => {
                await service.deleteCard(mockId as any);
                expect(todoListItemModel.findByIdAndRemove).toHaveBeenCalledWith(mockId);
            });

            it('should map result to Dto', async () => {
                await service.deleteCard(mockId as any);
                expect(service.mapToDto).toHaveBeenCalledWith(todoListItem1);
            });

            it('should return null if find by id return undefined', async () => {
                todoListItemModel.findByIdAndRemove = jest.fn().mockResolvedValue(undefined);
                const result = await service.deleteCard(mockId as any);
                expect(result).toBeNull();
            });
        });
    });

    describe('create operation', () => {
        function mockUserModel(dto: any) {
            this.data = dto;
            this.save = () => {
                return this.data;
            };
        }

        beforeEach(async () => {

            const testingModule: TestingModule = await Test.createTestingModule({
                providers: [
                    CardsService,
                    { provide: getModelToken(TodoListItem.name), useValue: mockUserModel },
                ],
            }).compile();

            service = testingModule.get<CardsService>(CardsService);
            jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any); // to make new Date() returns everytime the same date

            jest.clearAllMocks();
        });

        describe('createCard', () => {
            const description = 'some description';

            beforeEach(async () => {
                service.mapToDto = jest.fn();

                await service.createCard(description);
            });

            it('should mapToDto created element', async () => {
                expect(service.mapToDto).toHaveBeenCalled();
            });
        });
    });
});
