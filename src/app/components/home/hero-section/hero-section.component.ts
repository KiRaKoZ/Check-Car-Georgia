import { AfterViewInit, Component, ElementRef, inject, Signal, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent{
  cars: any[] = [];
  currentIndex = 0;
  autoplayInterval: any;
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;

  private http = inject(HttpClient);

  // Mouse drag related variables
  isDragging = false;
  startX = 0;
  threshold = 60;  // How much the mouse should move (in px) to trigger the slide change

  constructor() {
    this.loadCars();
    this.startAutoplay();
  }

  loadCars() {
    this.http.get<any>('i18n/eng.json').subscribe((data) => {
      this.cars = data.cars.slice(0, 4);
    });
  }

  changeSlide(next: boolean) {
    if (this.cars.length === 0) return;
    this.currentIndex = (this.currentIndex + (next ? 1 : -1) + this.cars.length) % this.cars.length;
    this.resetAutoplay();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.resetAutoplay();
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => this.changeSlide(true), 8000);
  }

  resetAutoplay() {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }

  onMoreInfo() {
    console.log('More info about:', this.cars[this.currentIndex]);
  }

  // Mouse drag events
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.pageX;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    const distance = event.pageX - this.startX;

    // If the mouse moves more than the threshold (e.g., 50px), trigger slide change
    if (distance > this.threshold) {
      this.changeSlide(false);  // Move to the previous slide
      this.isDragging = false;  // Stop dragging after one slide change
    } else if (distance < -this.threshold) {
      this.changeSlide(true);  // Move to the next slide
      this.isDragging = false;  // Stop dragging after one slide change
    }
  }

  startDrag(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.startX = clientX;
  }
  
  onDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
  
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const deltaX = clientX - this.startX;
  
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        this.changeSlide(false); // left swipe = previous
      } else {
        this.changeSlide(true);  // right swipe = next
      }
      this.isDragging = false; // Prevent multiple triggers
    }
  }
  
  endDrag(event: MouseEvent | TouchEvent) {
    this.isDragging = false;
  }
  onMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
    }
  }

  onMouseLeave() {
    if (this.isDragging) {
      this.onMouseUp();
    }
  }

  // Mobile touch events
  onTouchStart(event: TouchEvent) {
    this.isDragging = true;
    this.startX = event.touches[0].pageX;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;

    const distance = event.touches[0].pageX - this.startX;

    // If the touch moves more than the threshold (e.g., 50px), trigger slide change
    if (distance > this.threshold) {
      this.changeSlide(false);  // Move to the previous slide
      this.isDragging = false;  // Stop dragging after one slide change
    } else if (distance < -this.threshold) {
      this.changeSlide(true);  // Move to the next slide
      this.isDragging = false;  // Stop dragging after one slide change
    }
  }

  onTouchEnd() {
    if (this.isDragging) {
      this.isDragging = false;
    }
  }

  onTouchCancel() {
    if (this.isDragging) {
      this.isDragging = false;
    }
  }
}
