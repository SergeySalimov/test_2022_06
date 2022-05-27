import { TestBed } from '@angular/core/testing';

import { ToDoService } from './to-do.service';
import { TodoListItem } from '../shared/interfaces/to-do-page.interface';

const mockDate = new Date(2022, 2, 22);
const mockDescription = 'mockDescription';

const resultBeforeRemoveIndex2: Array<TodoListItem> = [
  { description: 'mock0', createdAt: mockDate, id: '0' },
  { description: 'mock1', createdAt: mockDate, id: '1' },
  { description: 'mock2', createdAt: mockDate, id: '2' },
  { description: 'mock3', createdAt: mockDate, id: '3' },
];

const expectedResult: Array<TodoListItem> = [
  { description: 'mock0', createdAt: mockDate, id: '0' },
  { description: 'mock1', createdAt: mockDate, id: '1' },
  { description: 'mock3', createdAt: mockDate, id: '3' },
];

describe('ToDoService', () => {
  let service: ToDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
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

    it('should add new value', (done: DoneFn) => {
      service.addTodoItem(mockDescription);

      service.todoList$.subscribe((result: Array<TodoListItem>) => {
        expect(result).toEqual([{
          description: mockDescription,
          createdAt: mockDate,
        }]);
        done();
      });
    });

    it('should not add new value if it is a falsy value', (done: DoneFn) => {
      service.addTodoItem(null as any);

      service.todoList$.subscribe((result: Array<TodoListItem>) => {
        expect(result).toEqual([]);
        done();
      });
    });

    it('should not add new value if it is not a string value', (done: DoneFn) => {
      service.addTodoItem(1111 as any);

      service.todoList$.subscribe((result: Array<TodoListItem>) => {
        expect(result).toEqual([]);
        done();
      });
    });
  });

  describe('removeTodoItem', () => {
    it('should be defined', () => {
      expect(service.removeTodoItem).toBeDefined();
    });

    it('should remove todo item by index', (done: DoneFn) => {
      (service as any)._todoList$.next(resultBeforeRemoveIndex2);

      service.removeTodoItem(2);

      service.todoList$.subscribe((result: Array<TodoListItem>) => {
        expect(result).toEqual(expectedResult);
        done();
      });
    });

    it('should not remove todo item if index greater than quantity of items', (done: DoneFn) => {
      (service as any)._todoList$.next(resultBeforeRemoveIndex2);

      service.removeTodoItem(22);

      service.todoList$.subscribe((result: Array<TodoListItem>) => {
        expect(result).toEqual(resultBeforeRemoveIndex2);
        done();
      });
    });
  });
});