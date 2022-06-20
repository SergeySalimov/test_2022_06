import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoTableBodyComponent } from './to-do-table-body.component';

describe('ToDoTableBodyComponent', () => {
  let component: ToDoTableBodyComponent;
  let fixture: ComponentFixture<ToDoTableBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoTableBodyComponent ]
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
