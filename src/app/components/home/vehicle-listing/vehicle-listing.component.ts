import { Component, ElementRef, Renderer2, HostListener, inject, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-vehicle-listing',
  standalone: true,
  templateUrl: './vehicle-listing.component.html',
  styleUrl: './vehicle-listing.component.scss',
  imports: [CommonModule]
})
export class VehicleListingComponent {
  cars: any[] = [];
  currentIndex = 0;
  isDragging = false;
  startX = 0;
  autoSlideInterval: any;
  screenWidth = window.innerWidth;

  backgroundColors = ['#735043', '#373948'];
  randomBackgrounds: string[] = [];

  
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;
  
  constructor(
    private http: HttpClient
  ) {
    this.loadCars();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
  }

  loadCars() {
    this.http.get<any>('i18n/eng.json').subscribe((data) => {
      this.cars = data.cars;
      this.generateRandomBackgrounds();
      this.startAutoSlide();
    });
  }

  generateRandomBackgrounds() {
    this.randomBackgrounds = this.cars.map(() => this.getRandomColor());
  }

  getRandomColor(): string {
    return this.backgroundColors[Math.floor(Math.random() * this.backgroundColors.length)];
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => this.nextSlide(), 125800);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.cars.length;
    this.startAutoSlide();


  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.cars.length) % this.cars.length;
    this.startAutoSlide();

  }


}
