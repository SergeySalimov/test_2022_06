import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoPageComponent } from './to-do-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ToDoPageComponent', () => {
  let component: ToDoPageComponent;
  let fixture: ComponentFixture<ToDoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToDoPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
