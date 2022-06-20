import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoTableBodyComponent } from './to-do-table-body.component';
import { TranslateModule } from '@ngx-translate/core';
import { FilterTodosService, FollowTodosService, ToDoService } from '@core/services';
import { FilterTodosServiceStub, FollowTodosServiceStub, ToDoServiceStub } from '@shared/test-shared/mock.service';
import { dateTimeFormatToken } from '@shared/shared.module';
import { ChangeDetectorRef } from '@angular/core';
import createSpy = jasmine.createSpy;

describe('ToDoTableBodyComponent', () => {
  let component: ToDoTableBodyComponent;
  let fixture: ComponentFixture<ToDoTableBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ToDoTableBodyComponent],
      providers: [
        { provide: dateTimeFormatToken, useValue: 'mockDateTimeFormat' },
        { provide: ToDoService, useClass: ToDoServiceStub },
        { provide: FollowTodosService, useClass: FollowTodosServiceStub },
        { provide: FilterTodosService, useClass: FilterTodosServiceStub },
        { provide: ChangeDetectorRef, useValue: { markForCheck: createSpy() } },
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
