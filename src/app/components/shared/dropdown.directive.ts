import { Directive, ElementRef, HostListener } from '@angular/core';
import { DropdownService } from '../services/dropdown.service';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  constructor(private el: ElementRef, private dropdownService: DropdownService) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.dropdownService.isTouchDevice()) {
      this.toggleDropdown(true);
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (!this.dropdownService.isTouchDevice()) {
      this.toggleDropdown(false);
    }
  }

  @HostListener('click') onClick() {
    if (this.dropdownService.isTouchDevice()) {
      const isOpen = this.el.nativeElement.classList.contains('open');
      this.toggleDropdown(!isOpen);
    }
  }

  private toggleDropdown(state: boolean) {
    if (state) {
      this.el.nativeElement.classList.add('open');
    } else {
      this.el.nativeElement.classList.remove('open');
    }
  }
}
