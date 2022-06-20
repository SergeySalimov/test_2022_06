import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoTableComponent } from './to-do-table.component';
import { ToDoService } from '@core/services';
import { dateTimeFormatToken } from '@shared/shared.module';
import { mockTodoService } from '@shared/test-shared/mock.service';

describe('ToDoTableComponent', () => {
  let component: ToDoTableComponent;
  let fixture: ComponentFixture<ToDoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToDoTableComponent],
      providers: [
        { provide: ToDoService, useValue: mockTodoService },
        { provide: dateTimeFormatToken, useValue: 'MOCK_DATE_TIME_FORMAT' },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
