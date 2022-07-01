import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoPageComponent } from './to-do-page.component';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FollowTodosService, ToDoService } from '@core/services';
import {
  ActivatedRouteStub,
  ChangeDetectorRefStub,
  FollowTodosServiceStub,
  ToDoServiceStub
} from '@shared/test-shared/mock.service';
import { ActivatedRoute } from '@angular/router';

describe('ToDoPageComponent', () => {
  let component: ToDoPageComponent;
  let fixture: ComponentFixture<ToDoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ToDoPageComponent],
      providers: [
        { provide: ToDoService, useClass: ToDoServiceStub },
        { provide: FollowTodosService, useClass: FollowTodosServiceStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: ChangeDetectorRef, useClass: ChangeDetectorRefStub },
      ],
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
