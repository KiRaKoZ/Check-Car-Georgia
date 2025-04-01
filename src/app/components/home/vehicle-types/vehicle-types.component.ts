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
export class VehicleTypesComponent implements OnInit {
  @ViewChild('slider') sliderRef!: ElementRef;

  bodyStyles: BodyStyle[] = [
    { image: 'images/tr-car.png', altText: 'Sedan', name: 'Sedan' },
    { image: 'images/tr-car2.png', altText: 'Coupe', name: 'Coupe' },
    { image: 'images/tr-car3.png', altText: 'SUV', name: 'SUV' },
    // { image: 'images/tr-car4.png', altText: 'Truck', name: 'Truck' },
    { image: 'images/tr-car6.png', altText: 'Hatchback', name: 'Hatchback' },
    // { image: 'images/tr-car7.png', altText: 'Minivan', name: 'Minivan' }
  ];

  translateX = 0;
  itemWidth = 210;
  visibleItems = 6;

  ngOnInit(): void {
    this.updateVisibleItems();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateVisibleItems();
  }

  updateVisibleItems(): void {
    const width = window.innerWidth;
    if (width < 640) {
      this.visibleItems = 2;
    } else if (width < 768) {
      this.visibleItems = 3;
    } else {
      this.visibleItems = 4;
    }
    this.adjustTranslateX();
  }

  slide(direction: 'left' | 'right'): void {
    const maxTranslate = -(this.bodyStyles.length - this.visibleItems) * this.itemWidth;
    if (direction === 'left') {
      this.translateX = Math.min(this.translateX + this.itemWidth, 0);
    } else {
      this.translateX = Math.max(this.translateX - this.itemWidth, maxTranslate);
    }
  }

  private adjustTranslateX(): void {
    const maxTranslate = -(this.bodyStyles.length - this.visibleItems) * this.itemWidth;
    this.translateX = Math.max(this.translateX, maxTranslate);
  }
}