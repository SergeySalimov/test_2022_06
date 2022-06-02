import { AfterViewInit, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[truncate]'
})
export class TruncateDirective implements AfterViewInit {
  el: HTMLElement;

  constructor(private readonly elementRef: ElementRef, private readonly renderer: Renderer2) {
    this.el = this.elementRef.nativeElement;
    const stylesToEllipsis: Record<string, string> = {
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
      'overflow': 'hidden',
      'display': 'block',
    };

    for (const [key, value] of Object.entries(stylesToEllipsis)) {
      this.renderer.setStyle(this.el, key, value);
    }
  }

  ngAfterViewInit(): void {
    // fix for first render when offsetWidth and scrollWidth of element equal 0
    this.renderer.setProperty(this.el, 'scrollTop', 1);
    this.setTooltipFixWidth();
  }

  @HostListener('window:resize', ['$event.target'])
  setTooltipFixWidth(): void {
    this.el.offsetWidth < this.el.scrollWidth
      ? this.renderer.setAttribute(this.el, 'title', this.el.textContent as string)
      : this.renderer.removeAttribute(this.el, 'title');
  }
}
