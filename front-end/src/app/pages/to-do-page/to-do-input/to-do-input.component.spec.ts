import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoInputComponent } from './to-do-input.component';
import { ToDoService } from '@core/services';
import { ToDoServiceStub } from '@shared/test-shared/mock.service';
import { ToDoPageModule } from '../to-do-page.module';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import Spy = jasmine.Spy;

describe('ToDoInputComponent', () => {
  let component: ToDoInputComponent;
  let fixture: ComponentFixture<ToDoInputComponent>;
  let todoService: ToDoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ToDoPageModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ToDoInputComponent],
      providers: [
        { provide: ToDoService, useClass: ToDoServiceStub },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    todoService = TestBed.inject<ToDoService>(ToDoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onAddTodo', () => {
    let addTodoItemSpy: Spy;

    beforeEach(() => {
      addTodoItemSpy = spyOn(todoService, 'addTodoItem').and.returnValue(of({} as any))
    });

    it('should be defined', () => {
      expect(component.addTodo).toBeDefined();
    });

    it('should call addTodoItem', () => {
      component.newToDo = 'some todo present';
      component.addTodo();

      expect(addTodoItemSpy).toHaveBeenCalled();
    });

    it('should set newToDo to empty string', () => {
      component.newToDo = 'test todo';

      component.addTodo();

      expect(component.newToDo).toEqual('');
    });
  });
});
