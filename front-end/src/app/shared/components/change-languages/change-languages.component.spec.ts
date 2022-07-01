import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLanguagesComponent } from './change-languages.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

describe('ChangeLanguagesComponent', () => {
  let component: ChangeLanguagesComponent;
  let fixture: ComponentFixture<ChangeLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        FormsModule,
      ],
      declarations: [ChangeLanguagesComponent],
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
