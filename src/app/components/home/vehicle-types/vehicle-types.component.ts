import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
interface BodyStyle {
  image: string;
  altText: string;
  name: string;
}
@Component({
  selector: 'app-vehicle-types',
  imports: [CommonModule],
  standalone: true, 
  templateUrl: './vehicle-types.component.html',
  styleUrl: './vehicle-types.component.scss',
  animations: [
    trigger('slideAnimation', [
      transition('* => *', [
        style({ transform: '{{startTransform}}' }),
        animate('300ms ease-in-out', style({ transform: '{{endTransform}}' }))
      ])
    ])
  ]
})
export class VehicleTypesComponent  {

  bodyStyles: BodyStyle[] = [
    { image: 'images/tr-car.png', altText: 'Sedan', name: 'Sedan' },
    { image: 'images/tr-car2.png', altText: 'Coupe', name: 'Coupe' },
    { image: 'images/tr-car3.png', altText: 'SUV', name: 'SUV' },
    { image: 'images/tr-car6.png', altText: 'Hatchback', name: 'Hatchback' },
    { image: 'images/tr-car7.png', altText: 'Minivan', name: 'Minivan' }
  ];

}