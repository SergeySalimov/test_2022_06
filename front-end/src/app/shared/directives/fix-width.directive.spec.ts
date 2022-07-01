import { FixWidthDirective } from './fix-width.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <span fix-width>Test Data</span>
  `,
})
class TestComponent {}

describe('FixWidthDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: FixWidthDirective;

  beforeEach(async () => {
    fixture = await TestBed.configureTestingModule({
      declarations: [
        FixWidthDirective,
        TestComponent,
      ]
    }).createComponent<TestComponent>(TestComponent);

    fixture.detectChanges();

    const debugElement: DebugElement = fixture.debugElement.query(By.directive(FixWidthDirective));
    directive = debugElement.injector.get(FixWidthDirective);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create an instance', () => {
    expect(directive).toBeDefined();
  });
});
