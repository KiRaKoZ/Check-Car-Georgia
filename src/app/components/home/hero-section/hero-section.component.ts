import { Component } from '@angular/core';
import { CarService } from '../services/car-info.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
  providers: [CarService], 
})
export class HeroSectionComponent {
  cars: { 
    name: string; 
    price: string; 
    per: string; 
    fuel: string; 
    transmission: string; 
    year: number; 
    image: string; 
  }[] = [];

  currentIndex = 0;
  fading = false;
  autoplayInterval: any;

  constructor(private carService: CarService) {
    this.cars = this.carService.cars; 
    this.startAutoplay(); 
  }

  changeSlide(next: boolean) {
    if (this.fading) return;
    this.fading = true;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + (next ? 1 : -1) + this.cars.length) % this.cars.length;
      this.fading = false;
    }, 600);
    this.stopAutoplay();
  }
  goToSlide(index: number) {
    if (this.fading) return;
    this.fading = true;
    setTimeout(() => {
      this.currentIndex = index;
      this.fading = false;
    }, 600);
    this.stopAutoplay();
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => this.changeSlide(true), 8000); 
  }

  stopAutoplay() {
    clearInterval(this.autoplayInterval); // Stop the autoplay interval\
    this.autoplayInterval = setInterval(() => this.changeSlide(true), 8000); 

  }

  onMoreInfo() {
    console.log('More info about:', this.cars[this.currentIndex]);
  }


}