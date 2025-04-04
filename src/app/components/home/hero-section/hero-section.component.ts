import { Component, inject, Signal } from '@angular/core';
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
export class HeroSectionComponent {
  cars: any[] = [];
  currentIndex = 0;
  autoplayInterval: any;

  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;
  
  private http = inject(HttpClient);

  constructor() {
    this.loadCars();
    this.startAutoplay();
  }

  loadCars() {
    this.http.get<any>('i18n/eng.json').subscribe((data) => {
      this.cars = data.cars;
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
}
