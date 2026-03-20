import { CommonModule } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { CarDataService } from '../../services/car-data.service';
import { Car } from '../../../models/car.model';

interface DisplayCard {
  image: string;
  label: string;
  typeKey: string;
  available: boolean;
}

@Component({
  selector: 'app-home-cars',
  imports: [CommonModule, RouterLink],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss',
})
export class CarsComponent {
  cars: Car[] = [];
  displayCards: DisplayCard[] = [];
  activeFilter: 'all' | 'available' | 'unavailable' = 'all';
  private translationService = inject(TranslationService);
  private carDataService = inject(CarDataService);
  translations: Signal<any> = this.translationService.translations;
  private preferredTypes = [
    { key: 'suv', label: 'SUV' },
    { key: 'sedan', label: 'Sedan' },
    { key: 'hatchback', label: 'Hatchback' },
    { key: 'cabriolet', label: 'Cabriolet' },
    { key: 'coupe', label: 'Coupe' },
  ];

  constructor() {
    this.carDataService.getCars().subscribe((cars) => {
      this.cars = cars;
      this.buildCards();
    });
  }

  setFilter(filter: 'all' | 'available' | 'unavailable'): void {
    this.activeFilter = filter;
    this.buildCards();
  }

  private buildCards(): void {
    const scopedCars = this.cars.filter((car) => this.activeFilter === 'all' || (this.activeFilter === 'available' ? car.available : !car.available));
    const source = scopedCars.length ? scopedCars : this.cars;
    this.displayCards = this.preferredTypes.map((type, index) => {
      const matched = source.find((car) => car.typeKey === type.key) || source[index] || source[0];
      return {
        image: matched?.image || 'images/rentCar.jpeg',
        label: type.label,
        typeKey: type.key,
        available: matched?.available !== false,
      };
    }).filter((card) => !!card.image);
  }
}
