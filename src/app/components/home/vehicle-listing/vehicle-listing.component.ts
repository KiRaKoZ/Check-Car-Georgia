import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  Signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
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
  filteredCars: Car[] = [];
  currentIndex = 0;
  autoSlideInterval?: ReturnType<typeof setInterval>;

  screenWidth = window.innerWidth;
  dragStartX = 0;
  dragOffsetX = 0;
  isDragging = false;

  activeFilter: 'all' | 'available' | 'unavailable' = 'all';

  backgroundColors = ['#8A6252', '#3E4254', '#4662F0', '#6B7280'];
  randomBackgrounds: string[] = [];
  private router = inject(Router);
  private carDataService = inject(CarDataService);
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;

  @HostListener('window:resize')
  onResize(): void {
    this.screenWidth = window.innerWidth;
    this.normalizeIndex();
  }

  ngOnInit(): void {
    this.carDataService.getCars().subscribe((cars) => {
      this.cars = cars || [];
      this.applyFilter();
    });
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  get isMobile(): boolean {
    return this.screenWidth < 768;
  }

  get isTablet(): boolean {
    return this.screenWidth >= 768 && this.screenWidth < 1024;
  }

  get slidePercent(): number {
    if (this.isMobile) return 100;
    if (this.isTablet) return 64;
    return 42;
  }

  get visibleSlidesCount(): number {
    if (this.isMobile) return 1;
    if (this.isTablet) return 1;
    return 2;
  }

  get maxIndex(): number {
    return Math.max(this.filteredCars.length - this.visibleSlidesCount, 0);
  }

  setFilter(filter: 'all' | 'available' | 'unavailable'): void {
    this.activeFilter = filter;
    this.currentIndex = 0;
    this.applyFilter();
  }

  applyFilter(): void {
    this.filteredCars = this.cars.filter((car: any) => {
      if (this.activeFilter === 'all') return true;

      const isAvailable =
        car?.available ??
        car?.isAvailable ??
        (car?.status ? car.status === 'available' : undefined) ??
        true;

      return this.activeFilter === 'available' ? !!isAvailable : !isAvailable;
    });

    this.randomBackgrounds = this.filteredCars.map(
      (_, index) => this.backgroundColors[index % this.backgroundColors.length],
    );

    this.normalizeIndex();
    this.restartAutoSlide();
  }

  normalizeIndex(): void {
    if (this.currentIndex < 0) {
      this.currentIndex = 0;
    }

    if (this.currentIndex > this.maxIndex) {
      this.currentIndex = this.maxIndex;
    }
  }

  restartAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }

    if (
      this.filteredCars.length > this.visibleSlidesCount &&
      !this.isDragging
    ) {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide();
      }, 100000);
    }
  }

  nextSlide(): void {
    if (!this.filteredCars.length) return;

    if (this.currentIndex >= this.maxIndex) {
      this.currentIndex = 0;
    } else {
      this.currentIndex += 1;
    }
  }

  prevSlide(): void {
    if (!this.filteredCars.length) return;

    if (this.currentIndex <= 0) {
      this.currentIndex = this.maxIndex;
    } else {
      this.currentIndex -= 1;
    }
  }

  startDrag(clientX: number): void {
    this.isDragging = true;
    this.dragStartX = clientX;
    this.dragOffsetX = 0;

    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  moveDrag(clientX: number): void {
    if (!this.isDragging) return;
    this.dragOffsetX = clientX - this.dragStartX;
  }

  endDrag(): void {
    if (!this.isDragging) return;

    const threshold = this.isMobile ? 35 : this.isTablet ? 45 : 70;

    if (this.dragOffsetX < -threshold) {
      this.nextSlide();
    } else if (this.dragOffsetX > threshold) {
      this.prevSlide();
    }

    this.dragOffsetX = 0;
    this.isDragging = false;
    this.restartAutoSlide();
  }

  getTrackTransform(): string {
    const dragPercent = this.isMobile
      ? (this.dragOffsetX / Math.max(this.screenWidth, 1)) * 100
      : (this.dragOffsetX / Math.max(this.screenWidth, 1)) * 70;

    return `translateX(calc(-${this.currentIndex * this.slidePercent}% + ${dragPercent}px))`;
  }

  getCardBackground(index: number): string {
    return this.randomBackgrounds[index] || this.backgroundColors[0];
  }

  isUnavailable(car: any): boolean {
    const isAvailable =
      car?.available ??
      car?.isAvailable ??
      (car?.status ? car.status === 'available' : true);

    return !isAvailable;
  }

  getCarImage(car: any): string {
    return (
      car?.image ||
      car?.img ||
      car?.thumbnail ||
      car?.cover ||
      car?.images?.[0] ||
      'images/placeholder-car.png'
    );
  }
  onMoreInfo(): void {
    const currentCar = this.cars[this.currentIndex];
    if (currentCar) {
      this.router.navigate(['/cars', currentCar.slug]);
    }
  }
}
