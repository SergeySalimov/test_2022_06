import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoTableFilterComponent } from './to-do-table-filter.component';

describe('ToDoTableFilterComponent', () => {
  let component: ToDoTableFilterComponent;
  let fixture: ComponentFixture<ToDoTableFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoTableFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoTableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
