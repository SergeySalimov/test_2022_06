import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[fix-width]'
})
export class FixWidthDirective {
  @Input() widthToFix = 65;

  el: HTMLElement;
  tableRowEl: HTMLElement;

  constructor(private readonly elementRef: ElementRef, private readonly renderer: Renderer2) {
    this.el = this.elementRef.nativeElement;
    this.tableRowEl = (this.el.parentNode as HTMLElement).parentNode as HTMLElement;
  }

  @HostListener('window:resize', ['$event.target'])
  setTooltipFixWidth(): void {
    const widthOfEllipsis: number = 24;
    const widthForEl: string = `${Math.floor(this.tableRowEl.offsetWidth * this.widthToFix / 100) - widthOfEllipsis}px`;
    this.renderer.setStyle(this.el, 'width', widthForEl);
  }
}
