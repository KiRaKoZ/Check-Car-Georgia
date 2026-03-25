import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarDataService } from '../../services/car-data.service';
import { TranslationService } from '../../services/translation.service';
import { FormSubmitService } from '../../services/form-submit.service';
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
  private formSubmitService = inject(FormSubmitService);
  translations: Signal<any> = this.translationService.translations;
  cars: Car[] = [];
  filteredCars: Car[] = [];
  search = '';
  searchOpen = false;
  isSubmitting = false;
  submitMessage = '';
  submitError = false;
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

  toggleSearch(): void { this.searchOpen = !this.searchOpen; if (!this.searchOpen) { this.search = ''; this.filterCars(); } }
  filterCars(): void { const query = this.search.trim().toLowerCase(); this.filteredCars = this.cars.filter(car => !query || `${car.fullName} ${car.year} ${car.type}`.toLowerCase().includes(query)); }
  selectCar(slug: string): void { const car = this.cars.find(item => item.slug === slug); if (!car || !car.available) return; this.formData.carSlug = slug; }
  get selectedCar(): Car | undefined { return this.cars.find(car => car.slug === this.formData.carSlug); }
  get rentalDays(): number { if (!this.formData.pickupDate || !this.formData.returnDate) return 0; const start = new Date(this.formData.pickupDate); const end = new Date(this.formData.returnDate); const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)); return diff > 0 ? diff : 0; }
  get totalPrice(): number { return (this.selectedCar?.priceValue || 0) * this.rentalDays; }
  get currencySymbol(): string { return this.selectedCar?.currency === 'USD' ? '$' : '₾'; }
  get minDate(): string { return new Date().toISOString().split('T')[0]; }

  get validationErrors(): string[] {
    const t = this.translations()?.booking?.validation || {};
    const errors: string[] = [];
    if (!this.formData.firstName.trim()) errors.push(t.firstName || '');
    if (!this.formData.lastName.trim()) errors.push(t.lastName || '');
    if (!this.formData.phone.trim()) errors.push(t.phone || '');
    if (this.formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) errors.push(t.email || '');
    if (!this.formData.carSlug) errors.push(t.car || '');
    if (!this.formData.pickupDate) errors.push(t.pickup || '');
    if (!this.formData.returnDate || this.rentalDays <= 0) errors.push(t.return || '');
    return errors.filter(Boolean);
  }

  submitBooking(): void {
    if (this.validationErrors.length || this.selectedCar?.available === false) {
      this.submitError = true;
      this.submitMessage = this.validationErrors[0] || this.translations()?.booking?.submitError;
      return;
    }
    this.isSubmitting = true;
    this.submitError = false;
    this.submitMessage = '';
    this.formSubmitService.submitBooking({
      ...this.formData,
      carName: this.selectedCar?.fullName || this.selectedCar?.name || '',
      rentalDays: this.rentalDays,
      totalPrice: this.totalPrice,
      currency: this.selectedCar?.currency || 'GEL'
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitError = false;
        this.submitMessage = this.translations()?.booking?.submitSuccess;
        this.formData = { firstName: '', lastName: '', email: '', phone: '', carSlug: this.formData.carSlug, pickupDate: '', returnDate: '' };
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = true;
        this.submitMessage = this.translations()?.booking?.submitError;
      }
    });
  }
}
