import { Component } from '@angular/core';
import { CarService } from '../services/car-info.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-listing',
  imports: [CommonModule],
  templateUrl: './vehicle-listing.component.html',
  styleUrl: './vehicle-listing.component.scss',
  providers: [CarService],
})
export class VehicleListingComponent {
   cars: { 
    name: string; 
    price: string; 
    per: string; 
    fuel: string; 
    transmission: string; 
    year: number; 
    image: string; 
  }[] = [];
  currentIndex: number = 0;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.cars = this.carService.cars; 
  }

  nextSlide() {
    if (this.currentIndex < this.cars.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.cars.length - 1;
    }
  }
}
