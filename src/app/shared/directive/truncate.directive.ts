import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[truncate]'
})
export class TruncateDirective implements AfterViewInit {
  @Input() widthToFix = 65;

  el: HTMLElement;
  tableRowEl: HTMLElement;

  constructor(private readonly elementRef: ElementRef, private readonly renderer: Renderer2) {
    this.el = this.elementRef.nativeElement;
    this.tableRowEl = (this.el.parentNode as HTMLElement).parentNode as HTMLElement;
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

    const widthOfEllipsis: number = 24;
    const widthForEl: string = `${Math.floor(this.tableRowEl.offsetWidth * this.widthToFix / 100) - widthOfEllipsis}px`;
    this.renderer.setStyle(this.el, 'width', widthForEl);
  }
}
