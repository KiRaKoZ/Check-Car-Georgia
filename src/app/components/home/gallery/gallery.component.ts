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
}

@Component({
  selector: 'app-gallery-legacy',
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  cars: Car[] = [];
  displayCards: DisplayCard[] = [];
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
      this.displayCards = this.preferredTypes.map((type, index) => {
        const matched = cars.find((car) => car.typeKey === type.key) || cars[index] || cars[0];
        return {
          image: matched?.image || 'images/rentCar.jpeg',
          label: type.label,
          typeKey: type.key,
        };
      });
    });
  }
}
