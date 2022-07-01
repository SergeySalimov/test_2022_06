import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInputComponent } from './card-input.component';
import { dateTimeFormatToken, phoneMaskFormatToken, zipcodeMaskFormatToken } from '@shared/shared.module';
import { MaskInterface } from '@core/constants';
import { MaskPipe } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import createSpy = jasmine.createSpy;

const mockMask: MaskInterface = { prefix: 'mockPrefix', data: 'mock mask' };

describe('CardInputComponent', () => {
  let component: CardInputComponent;
  let fixture: ComponentFixture<CardInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [CardInputComponent],
      providers: [
        { provide: phoneMaskFormatToken, useValue: mockMask },
        { provide: zipcodeMaskFormatToken, useValue: mockMask },
        { provide: dateTimeFormatToken, useValue: 'mockDataFormat'},
        { provide: MaskPipe, useValue: { transform: createSpy() } },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
