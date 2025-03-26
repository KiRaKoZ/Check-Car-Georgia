import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  slides = [
    {
      image: 'images/car1.jpg',
      title: 'Mercedes-Benz, C Class',
      description: '2023 C300e AMG Line Night Ed Premium Plus 5dr 9G-Tronic',
      price: '$200',
    },
    {
      image: 'images/Prado200.jpeg',
      title: 'BMW X5 M50d',
      description: 'Luxury SUV with a powerful engine and high-end interiors.',
      price: '$250',
    },
    {
      image: 'images/BMW_X5_E70.jpeg',
      title: 'Audi A7 Sportback',
      description: 'Elegant design with top-notch performance.',
      price: '$220',
    },
    {
        image: 'images/car1.jpg',
        title: 'Mercedes-Benz, C Class',
        description: '2023 C300e AMG Line Night Ed Premium Plus 5dr 9G-Tronic',
        price: '$200',
      },
      {
        image: 'images/BMW_X5_E70.jpeg',
        title: 'Audi A7 Sportback',
        description: 'Elegant design with top-notch performance.',
        price: '$220',
      },
      {
        image: 'images/car1.jpg',
        title: 'Mercedes-Benz, C Class',
        description: '2023 C300e AMG Line Night Ed Premium Plus 5dr 9G-Tronic',
        price: '$200',
      },
      {
        image: 'images/Prado200.jpeg',
        title: 'BMW X5 M50d',
        description: 'Luxury SUV with a powerful engine and high-end interiors.',
        price: '$250',
      },
  ];
}
