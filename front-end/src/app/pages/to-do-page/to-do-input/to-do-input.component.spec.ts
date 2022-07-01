import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoInputComponent } from './to-do-input.component';
import { ToDoPageModule } from '../to-do-page.module';
import { TranslateModule } from '@ngx-translate/core';

describe('ToDoInputComponent', () => {
  let component: ToDoInputComponent;
  let fixture: ComponentFixture<ToDoInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ToDoPageModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ToDoInputComponent],
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
      expect(component.addTodo).toBeDefined();
    });
  });
});
