import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoTableHeaderComponent } from './to-do-table-header.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ToDoTableHeaderComponent', () => {
  let component: ToDoTableHeaderComponent;
  let fixture: ComponentFixture<ToDoTableHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ToDoTableHeaderComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
