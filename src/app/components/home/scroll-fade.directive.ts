import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appScrollFade]'
})
export class ScrollFadeDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'fade-in');
        } else {
          this.renderer.removeClass(this.el.nativeElement, 'fade-in');
        }
      },
    );

    observer.observe(this.el.nativeElement);
  }
}
