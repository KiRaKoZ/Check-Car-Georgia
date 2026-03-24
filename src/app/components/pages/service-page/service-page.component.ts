import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarDataService } from '../../services/car-data.service';
import { TranslationService } from '../../services/translation.service';
import { Car } from '../../../models/car.model';

@Component({
  selector: 'app-service-page',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.scss'
})
export class ServicePageComponent {
  private carDataService = inject(CarDataService);
  private translationService = inject(TranslationService);
  private route = inject(ActivatedRoute);
  translations: Signal<any> = this.translationService.translations;
  cars: Car[] = [];
  filteredCars: Car[] = [];
  search = '';
  searchOpen = false;
  formData = { firstName: '', lastName: '', email: '', phone: '', carSlug: '', pickupDate: '', returnDate: '' };

  constructor() {
    this.carDataService.getCars().subscribe(cars => {
      this.cars = cars;
      this.filterCars();
      const preselected = this.route.snapshot.queryParamMap.get('car');
      const requested = preselected && cars.some(car => car.slug === preselected) ? preselected : '';
      this.formData.carSlug = requested || cars.find(car => car.available)?.slug || cars[0]?.slug || '';
    });
  }

  toggleSearch(): void {
    this.searchOpen = !this.searchOpen;
    if (!this.searchOpen) {
      this.search = '';
      this.filterCars();
    }
  }

  filterCars(): void {
    const query = this.search.trim().toLowerCase();
    this.filteredCars = this.cars.filter(car => !query || `${car.fullName} ${car.year} ${car.type}`.toLowerCase().includes(query));
  }

  selectCar(slug: string): void {
    const car = this.cars.find(item => item.slug === slug);
    if (!car || !car.available) return;
    this.formData.carSlug = slug;
  }

  get selectedCar(): Car | undefined {
    return this.cars.find(car => car.slug === this.formData.carSlug);
  }

  get rentalDays(): number {
    if (!this.formData.pickupDate || !this.formData.returnDate) return 0;
    const start = new Date(this.formData.pickupDate);
    const end = new Date(this.formData.returnDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }

  get totalPrice(): number {
    const price = this.selectedCar?.priceValue || 0;
    return price * this.rentalDays;
  }

  get currencySymbol(): string {
    return this.selectedCar?.currency === 'USD' ? '$' : '₾';
  }

  get minDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  buildMailto(): string {
    const subject = `Booking request - ${this.selectedCar?.fullName || this.selectedCar?.name || 'Check Car Georgia'}`;
    const body = [
      `First name: ${this.formData.firstName}`,
      `Last name: ${this.formData.lastName}`,
      `Email: ${this.formData.email || '-'}`,
      `Phone: ${this.formData.phone}`,
      `Car: ${this.selectedCar?.fullName || this.selectedCar?.name || '-'}`,
      `Pickup date: ${this.formData.pickupDate || '-'}`,
      `Return date: ${this.formData.returnDate || '-'}`,
      `Rental days: ${this.rentalDays || '-'}`,
      `Estimated total: ${this.currencySymbol}${this.totalPrice || 0}`,
      `Availability: ${this.selectedCar?.available ? 'Available' : 'Unavailable'}`,
    ].join('\n');

    return `mailto:checkcargeorgia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
