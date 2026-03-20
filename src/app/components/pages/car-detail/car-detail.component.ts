import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';
import { CarDataService } from '../../services/car-data.service';
import { Car } from '../../../models/car.model';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.scss',
})
export class CarDetailComponent {
  private route = inject(ActivatedRoute);
  private carDataService = inject(CarDataService);
  private translationService = inject(TranslationService);
  private title = inject(Title);
  private meta = inject(Meta);
  translations: Signal<any> = this.translationService.translations;
  currentImageIndex = 0;
  isLightboxOpen = false;
  activeMedia: 'image' | 'video' = 'image';

  car$ = this.carDataService.getCars().pipe(map((cars) => cars.find((car) => car.slug === this.route.snapshot.paramMap.get('slug')) ?? null));

  constructor() {
    this.car$.subscribe(car => {
      if (car) {
        this.title.setTitle(`${car.fullName || car.name} ${car.year} | Check Car Georgia`);
        this.meta.updateTag({ name: 'description', content: `${car.fullName || car.name}, ${car.year}, ${car.transmission}, ${car.fuel}. Book directly with Check Car Georgia.` });
      }
    });
  }
  selectImage(index: number): void { this.currentImageIndex = index; this.activeMedia = 'image'; }
  selectVideo(): void { this.activeMedia = 'video'; }
  openLightbox(index: number): void { this.currentImageIndex = index; this.activeMedia = 'image'; this.isLightboxOpen = true; }
  closeLightbox(): void { this.isLightboxOpen = false; }
  prevImage(car: Car): void { this.currentImageIndex = (this.currentImageIndex - 1 + car.images.length) % car.images.length; }
  nextImage(car: Car): void { this.currentImageIndex = (this.currentImageIndex + 1) % car.images.length; }

  buildBookingEmailLink(carName: string): string {
    const subject = `Booking request - ${carName}`;
    return `mailto:checkcargeorgia@gmail.com?subject=${encodeURIComponent(subject)}`;
  }
}

