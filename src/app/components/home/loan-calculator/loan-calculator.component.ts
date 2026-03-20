import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarDataService } from '../../services/car-data.service';
import { TranslationService } from '../../services/translation.service';
import { Car } from '../../../models/car.model';

@Component({
  selector: 'app-loan-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './loan-calculator.component.html',
  styleUrl: './loan-calculator.component.scss'
})
export class LoanCalculatorComponent {
  private carDataService = inject(CarDataService);
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;
  cars: Car[] = [];
  selectedSlug = '';
  rentalDays = 3;

  constructor() {
    this.carDataService.getCars().subscribe(cars => {
      this.cars = cars;
      this.selectedSlug = cars[0]?.slug || '';
    });
  }

  get selectedCar(): Car | undefined {
    return this.cars.find(car => car.slug === this.selectedSlug);
  }

  get dailyPrice(): number {
    return this.selectedCar?.priceValue || 0;
  }

  get total(): number {
    return this.dailyPrice * Math.max(1, this.rentalDays || 1);
  }

  get currencySymbol(): string {
    return this.selectedCar?.currency === 'USD' ? '$' : '₾';
  }
}

