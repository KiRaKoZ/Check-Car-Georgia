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
  icon: string;
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

  private translationService = inject(TranslationService);
  private carDataService = inject(CarDataService);

  translations: Signal<any> = this.translationService.translations;

  private preferredTypes = [
    { key: 'suv', label: 'SUV', icon: 'icons/jeep.svg' },
    { key: 'sedan', label: 'Sedan', icon: 'icons/sedan.svg' },
    {
      key: 'hatchback',
      label: 'Hatchback',
      icon: 'icons/hatchback.svg',
    },
    {
      key: 'cabriolet',
      label: 'Cabriolet',
      icon: 'icons/convertible.svg',
    },
    { key: 'coupe', label: 'Coupe', icon: 'icons/coupe.svg' },
  ];

  constructor() {
    this.carDataService.getCars().subscribe((cars) => {
      this.cars = cars;
      this.buildCards();
    });
  }

  private buildCards(): void {
    const source = this.cars;

    this.displayCards = this.preferredTypes
      .map((type, index) => {
        const matched =
          source.find((car) => car.typeKey === type.key) ||
          source[index] ||
          source[0];

        return {
          image: matched?.image || 'images/rentCar.jpeg',
          label: type.label,
          typeKey: type.key,
          available: matched?.available !== false,
          icon: type.icon,
        };
      })
      .filter((card) => !!card.image);
  }
}
