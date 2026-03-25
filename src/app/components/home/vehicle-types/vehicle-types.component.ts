import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

interface BodyStyle {
  image: string;
  altText: string;
  name: string;
  value: string;
}

@Component({
  selector: 'app-vehicle-types',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vehicle-types.component.html',
  styleUrl: './vehicle-types.component.scss',
})
export class VehicleTypesComponent {
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;
  bodyStyles: BodyStyle[] = [
    {
      image: 'images/tr-sedan.png',
      altText: 'Sedan',
      name: 'Sedan',
      value: 'sedan',
    },
    {
      image: 'images/tr-coupe.png',
      altText: 'Coupe',
      name: 'Coupe',
      value: 'coupe',
    },
    { image: 'images/tr-suv.png', altText: 'SUV', name: 'SUV', value: 'suv' },
    {
      image: 'images/tr-hatchback.png',
      altText: 'Hatchback',
      name: 'Hatchback',
      value: 'hatchback',
    },
    {
      image: 'images/tr-coupe.png',
      altText: 'convertible',
      name: 'convertible',
      value: 'cabriolet',
    },
  ];

  duplicatedStyles: BodyStyle[] = [];

  constructor() {
    this.duplicatedStyles = [
      ...this.bodyStyles,
      ...this.bodyStyles,
      ...this.bodyStyles,
      ...this.bodyStyles,
      ...this.bodyStyles,
    ];
  }
}
