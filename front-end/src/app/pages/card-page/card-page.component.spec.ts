import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPageComponent } from './card-page.component';
import { ToDoService } from '@core/services';
import { ToDoServiceStub } from '@shared/test-shared/mock.service';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CardPageComponent', () => {
  let component: CardPageComponent;
  let fixture: ComponentFixture<CardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardPageComponent],
      providers: [
        { provide: ToDoService, useClass: ToDoServiceStub },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { ['cardId']: () => 'mockCardId' } } } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
