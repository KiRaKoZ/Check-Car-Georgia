import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface BodyStyle {
  image: string;
  altText: string;
  name: string;
}

@Component({
  selector: 'app-vehicle-types',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vehicle-types.component.html',
  styleUrl: './vehicle-types.component.scss',
})
export class VehicleTypesComponent {
  bodyStyles: BodyStyle[] = [
    { image: 'images/tr-sedan.png', altText: 'Sedan', name: 'Sedan' },
    { image: 'images/tr-coupe.png', altText: 'Coupe', name: 'Coupe' },
    { image: 'images/tr-suv.png', altText: 'SUV', name: 'SUV' },
    { image: 'images/tr-hatchback.png', altText: 'Hatchback', name: 'Hatchback' },
  ];

  duplicatedStyles: BodyStyle[] = [];

  constructor() {
    // Duplicate the styles for infinite loop illusion
    this.duplicatedStyles = [...this.bodyStyles, ...this.bodyStyles,  ...this.bodyStyles,  ...this.bodyStyles, ...this.bodyStyles];
  }
}
