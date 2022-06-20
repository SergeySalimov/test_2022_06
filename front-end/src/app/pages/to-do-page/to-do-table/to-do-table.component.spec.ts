import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoTableComponent } from './to-do-table.component';
import { FilterTodosService, FollowTodosService, ToDoService } from '@core/services';
import { FilterTodosServiceStub, FollowTodosServiceStub, ToDoServiceStub } from '@shared/test-shared/mock.service';
import { TranslateModule } from '@ngx-translate/core';

describe('ToDoTableComponent', () => {
  let component: ToDoTableComponent;
  let fixture: ComponentFixture<ToDoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ToDoTableComponent],
      providers: [
        { provide: ToDoService, useClass: ToDoServiceStub },
        { provide: FollowTodosService, useClass: FollowTodosServiceStub },
        { provide: FilterTodosService, useClass: FilterTodosServiceStub },
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
