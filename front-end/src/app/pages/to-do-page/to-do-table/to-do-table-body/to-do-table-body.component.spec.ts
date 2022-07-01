import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoTableBodyComponent } from './to-do-table-body.component';
import { TranslateModule } from '@ngx-translate/core';
import { dateTimeFormatToken } from '@shared/shared.module';

describe('ToDoTableBodyComponent', () => {
  let component: ToDoTableBodyComponent;
  let fixture: ComponentFixture<ToDoTableBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ToDoTableBodyComponent],
      providers: [
        { provide: dateTimeFormatToken, useValue: 'mockDateTimeFormat' },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoTableBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
