import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoInputComponent } from './to-do-input.component';
import { ToDoService } from '../../../services/to-do.service';
import { mockTodoService } from '../../../shared/test-shared/mock.service';
import { ToDoPageModule } from '../to-do-page.module';

describe('ToDoInputComponent', () => {
  let component: ToDoInputComponent;
  let fixture: ComponentFixture<ToDoInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoPageModule],
      declarations: [ToDoInputComponent],
      providers: [
        { provide: ToDoService, useValue: mockTodoService },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onAddTodo', () => {
    it('should be defined', () => {
      expect(component.onAddTodo).toBeDefined();
    });

    it('should call addTodoItem', () => {
      component.onAddTodo();

      expect(mockTodoService.addTodoItem).toHaveBeenCalled();
    });

    it('should set newToDo to empty string', () => {
      component.newToDo = 'test todo';

      component.onAddTodo();

      expect(component.newToDo).toEqual('');
    });
  });
});
