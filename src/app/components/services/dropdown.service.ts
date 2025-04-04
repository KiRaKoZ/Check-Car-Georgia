import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  private isTouchscreen = false;

  constructor() {
    this.isTouchscreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  isTouchDevice(): boolean {
    return this.isTouchscreen;
  }
}