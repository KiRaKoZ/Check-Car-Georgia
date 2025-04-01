import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {


  cars =[
    { image: 'images/slider_car11.jpg', altText: 'Sedan', name: 'Sedan' },
    { image: 'images/slider_car1.jpg', altText: 'Coupe', name: 'Coupe' },
    { image: 'images/slider_car3.jpg', altText: 'SUV', name: 'SUV' },
    { image: 'images/slider_car9.jpg', altText: 'SUV', name: 'SUV' },
    { image: 'images/slider_car10.jpg', altText: 'SUV', name: 'SUV' },

  ];
}
