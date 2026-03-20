import { Component, HostListener, OnDestroy, OnInit, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { CarDataService } from '../../services/car-data.service';
import { Car } from '../../../models/car.model';

@Component({
  selector: 'app-vehicle-listing',
  standalone: true,
  templateUrl: './vehicle-listing.component.html',
  styleUrl: './vehicle-listing.component.scss',
  imports: [CommonModule, RouterLink],
})
export class VehicleListingComponent implements OnInit, OnDestroy {
  cars: Car[] = [];
  currentIndex = 0;
  autoSlideInterval?: ReturnType<typeof setInterval>;
  screenWidth = window.innerWidth;
  backgroundColors = ['#735043', '#373948'];
  randomBackgrounds: string[] = [];
  dragStartX = 0;
  dragOffsetX = 0;
  isDragging = false;

  private translationService = inject(TranslationService);
  private carDataService = inject(CarDataService);
  translations: Signal<any> = this.translationService.translations;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = (event.target as Window).innerWidth;
  }

  ngOnInit(): void {
    this.carDataService.getCars().subscribe((cars) => {
      this.cars = cars;
      this.randomBackgrounds = this.cars.map((_, index) => this.backgroundColors[index % this.backgroundColors.length]);
      this.restartAutoSlide();
    });
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
  }

  restartAutoSlide(): void {
    if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
    if (this.cars.length > 1 && !this.isDragging) {
      this.autoSlideInterval = setInterval(() => this.nextSlide(), 7000);
    }
  }

  nextSlide(): void {
    if (!this.cars.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.cars.length;
  }

  prevSlide(): void {
    if (!this.cars.length) return;
    this.currentIndex = (this.currentIndex - 1 + this.cars.length) % this.cars.length;
  }

  startDrag(clientX: number): void {
    this.isDragging = true;
    this.dragStartX = clientX;
    this.dragOffsetX = 0;
    if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
  }

  moveDrag(clientX: number): void {
    if (!this.isDragging) return;
    this.dragOffsetX = clientX - this.dragStartX;
  }

  endDrag(): void {
    if (!this.isDragging) return;
    const slideWidth = this.screenWidth <= 1280 ? this.screenWidth : 620;
    const movedSlides = Math.round(this.dragOffsetX / slideWidth);
    const maxIndex = Math.max(this.cars.length - 1, 0);
    this.currentIndex = Math.min(maxIndex, Math.max(0, this.currentIndex - movedSlides));
    this.dragOffsetX = 0;
    this.isDragging = false;
    this.restartAutoSlide();
  }

  getTrackTransform(): string {
    const slideWidth = this.screenWidth <= 1280 ? this.screenWidth : 620;
    return `translateX(${(-this.currentIndex * slideWidth) + this.dragOffsetX}px)`;
  }
}
