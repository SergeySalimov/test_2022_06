import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLanguagesComponent } from './change-languages.component';

describe('ChangeLanguagesComponent', () => {
  let component: ChangeLanguagesComponent;
  let fixture: ComponentFixture<ChangeLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeLanguagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
