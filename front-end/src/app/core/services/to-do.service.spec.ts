import { TestBed } from '@angular/core/testing';

import { ToDoService } from './to-do.service';
import { TodoListItemDto } from '@common/interfaces';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockDate = new Date(2022, 2, 22);
const mockDescription = 'mockDescription';

const resultBeforeRemoveIndex2: Array<TodoListItemDto> = [
  { description: 'mock0', createdAt: mockDate, id: '0', pollStatus: 2 },
  { description: 'mock1', createdAt: mockDate, id: '1', pollStatus: 2 },
  { description: 'mock2', createdAt: mockDate, id: '2', pollStatus: 2 },
  { description: 'mock3', createdAt: mockDate, id: '3', pollStatus: 2 },
];

const expectedResult: Array<TodoListItemDto> = [
  { description: 'mock0', createdAt: mockDate, id: '0', pollStatus: 2 },
  { description: 'mock1', createdAt: mockDate, id: '1', pollStatus: 2 },
  { description: 'mock3', createdAt: mockDate, id: '3', pollStatus: 2 },
];

describe('ToDoService', () => {
  let service: ToDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ToDoService],
    });
    service = TestBed.inject(ToDoService);
  });

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(mockDate);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addTodoItem', () => {
    it('should be defined', () => {
      expect(service.addTodoItem).toBeDefined();
    });
  });

  describe('removeTodoItem', () => {
    it('should be defined', () => {
      expect(service.removeTodoItem).toBeDefined();
    });
  });
});
