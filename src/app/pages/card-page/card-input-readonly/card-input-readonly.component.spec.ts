import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInputReadonlyComponent } from './card-input-readonly.component';

describe('CardInputReadonlyComponent', () => {
  let component: CardInputReadonlyComponent;
  let fixture: ComponentFixture<CardInputReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInputReadonlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInputReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
