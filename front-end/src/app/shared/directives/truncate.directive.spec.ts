import { TruncateDirective } from './truncate.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <tr class="parent" style="width: 1000px">
      <td>
        <span truncate class="span-with-directive" style="width: 50px">Test Data</span>
      </td>
    </tr>
  `,
})
class TestComponent {}

describe('TruncateDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: TruncateDirective;

  beforeEach(async () => {
    fixture = await TestBed.configureTestingModule({
      declarations: [
        TruncateDirective,
        TestComponent,
      ],
    })
      .createComponent<TestComponent>(TestComponent);

    fixture.detectChanges();

    const debugElement: DebugElement = fixture.debugElement.query(By.directive(TruncateDirective));
    directive = debugElement.injector.get(TruncateDirective);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should be defined', () => {
    expect(directive).toBeDefined();
  });

  describe('constructor', () => {
    it('should assign on directives.el element with directives applied', () => {
      const targetEl: HTMLElement = fixture.debugElement.query(By.css('.span-with-directive')).nativeElement;
      expect(directive.el).toEqual(targetEl);
    });

    it('should apply all styles on target element', () => {
      const targetEl: HTMLElement = fixture.debugElement.query(By.css('.span-with-directive')).nativeElement;
      const { textOverflow, whiteSpace, overflow, display } = targetEl.style;

      expect(textOverflow).toEqual('ellipsis');
      expect(whiteSpace).toEqual('nowrap');
      expect(overflow).toEqual('hidden');
      expect(display).toEqual('block');
    });
  });

  describe('ngAfterViewInit', () => {
    it('should be defined', () => {
      expect(directive.ngAfterViewInit).toBeDefined();
    });

    it('should call set 1 to scrollTop value', () => {
      const targetEl: HTMLElement = fixture.debugElement.query(By.css('.span-with-directive')).nativeElement;
      spyOn<any>(directive['renderer'], 'setProperty');

      directive.ngAfterViewInit();

      expect((directive as any)['renderer'].setProperty).toHaveBeenCalledWith(targetEl, 'scrollTop', 1);
    });

    it('should call setTooltipFixWidth', () => {
      spyOn(directive, 'setTooltipFixWidth');

      directive.ngAfterViewInit();

      expect(directive.setTooltipFixWidth).toHaveBeenCalled();
    });
  });

  describe('setTooltipFixWidth', () => {
    let targetEl: HTMLElement;
    let parentEl: HTMLElement;

    beforeEach(() => {
      targetEl = fixture.debugElement.query(By.css('.span-with-directive')).nativeElement;
      parentEl = fixture.debugElement.query(By.css('.parent')).nativeElement;
    });

    it('should be defined', () => {
      expect(directive.setTooltipFixWidth).toBeDefined();
    });

    it('should add title attribute if offsetWidth < scrollWidth', () => {
      const veryLongText = 'veryLongText' + Array(100).fill('fill').join('');
      targetEl.textContent = veryLongText;

      directive.setTooltipFixWidth();

      const titleOnTargetElement = targetEl.attributes.getNamedItem('title');

      expect(titleOnTargetElement).toBeTruthy();
      expect(titleOnTargetElement?.value).toEqual(veryLongText);
    });

    it('should remove title attribute if offsetWidth >= scrollWidth', () => {
      // add very short text to create situation without title
      targetEl.textContent = '.';

      directive.setTooltipFixWidth();

      const titleOnTargetElement = targetEl.attributes.getNamedItem('title');

      expect(titleOnTargetElement).toBeFalsy();
    });
  });
});
