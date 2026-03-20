import { Component, OnDestroy, OnInit, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { CarDataService } from '../../services/car-data.service';
import { Car } from '../../../models/car.model';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  cars: Car[] = [];
  currentIndex = 0;
  autoplayInterval?: ReturnType<typeof setInterval>;
  isDragging = false;
  startX = 0;
  threshold = 60;

  private translationService = inject(TranslationService);
  private carDataService = inject(CarDataService);
  private router = inject(Router);
  translations: Signal<any> = this.translationService.translations;

  ngOnInit(): void {
    this.carDataService.getCars().subscribe((cars) => {
      this.cars = cars.filter((car) => car.featured).slice(0, 4);
      this.resetAutoplay();
    });
  }

  ngOnDestroy(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  changeSlide(next: boolean): void {
    if (!this.cars.length) return;
    this.currentIndex = (this.currentIndex + (next ? 1 : -1) + this.cars.length) % this.cars.length;
    this.resetAutoplay();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.resetAutoplay();
  }

  resetAutoplay(): void {
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);
    if (this.cars.length > 1) {
      this.autoplayInterval = setInterval(() => this.changeSlide(true), 8000);
    }
  }

  onMoreInfo(): void {
    const currentCar = this.cars[this.currentIndex];
    if (currentCar) {
      this.router.navigate(['/cars', currentCar.slug]);
    }
  }

  onMouseDown(event: MouseEvent): void { this.isDragging = true; this.startX = event.pageX; }
  onMouseMove(event: MouseEvent): void { this.handleDrag(event.pageX); }
  onMouseUp(): void { this.isDragging = false; }
  onMouseLeave(): void { this.isDragging = false; }
  onTouchStart(event: TouchEvent): void { this.isDragging = true; this.startX = event.touches[0].pageX; }
  onTouchMove(event: TouchEvent): void { this.handleDrag(event.touches[0].pageX); }
  onTouchEnd(): void { this.isDragging = false; }
  onTouchCancel(): void { this.isDragging = false; }

  private handleDrag(currentX: number): void {
    if (!this.isDragging) return;
    const distance = currentX - this.startX;
    if (distance > this.threshold) {
      this.changeSlide(false);
      this.isDragging = false;
    } else if (distance < -this.threshold) {
      this.changeSlide(true);
      this.isDragging = false;
    }
  }
}
