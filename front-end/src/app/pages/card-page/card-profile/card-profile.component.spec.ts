import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProfileComponent } from './card-profile.component';
import { ToDoService } from '@core/services';
import { ChangeDetectorRefStub, ToDoServiceStub } from '@shared/test-shared/mock.service';
import { ChangeDetectorRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('CardProfileComponent', () => {
  let component: CardProfileComponent;
  let fixture: ComponentFixture<CardProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), RouterTestingModule],
      declarations: [CardProfileComponent],
      providers: [
        { provide: ToDoService, useClass: ToDoServiceStub },
        { provide: ChangeDetectorRef, useClass: ChangeDetectorRefStub },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
