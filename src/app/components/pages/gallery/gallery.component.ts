import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, inject } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { CarDataService } from '../../services/car-data.service';
import { Car } from '../../../models/car.model';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-gallery-legacy',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  imports: [CommonModule, RouterLink, FormsModule],
})
export class GalleryComponent implements OnInit {
  private carDataService = inject(CarDataService);
  private translationService = inject(TranslationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  translations: Signal<any> = this.translationService.translations;
  cars: Car[] = [];
  filteredCars: Car[] = [];
  currentPage = 1;
  carsPerPage = 6;
  selectedType = 'all';
  selectedAvailability = 'all';
  selectedCurrency = 'all';
  search = '';
  minPrice = 0;
  maxPrice = 0;
  selectedMaxPrice = 0;
  typeOptions = [
    { value: 'all', label: 'All' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'coupe', label: 'Coupe' },
    { value: 'cabriolet', label: 'Cabriolet' },
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'suv', label: 'SUV' },
  ];

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Cars for rent | Check Car Georgia');
    this.meta.updateTag({ name: 'description', content: 'Browse available rental cars in Tbilisi, filter by type, and book directly with Check Car Georgia.' });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.selectedType = params.get('type') || 'all';
      this.selectedAvailability = params.get('status') || 'all';
      this.search = params.get('search') || '';
      this.selectedCurrency = params.get('currency') || 'all';
      const price = Number(params.get('maxPrice') || '0');
      if (price > 0) this.selectedMaxPrice = price;
      this.applyFilters(false);
    });

    this.carDataService.getCars().subscribe((cars) => {
      this.cars = cars;
      this.maxPrice = Math.max(...cars.map((car) => car.priceValue), 0);
      this.selectedMaxPrice = this.maxPrice;
      this.typeOptions = [
        { value: 'all', label: this.translationService.language() === 'geo' ? 'ყველა' : this.translationService.language() === 'rus' ? 'Все' : 'All' },
        ...Array.from(new Set(cars.map((car) => car.typeKey))).map((typeKey) => ({ value: typeKey, label: cars.find((car) => car.typeKey === typeKey)?.type || typeKey }))
      ];
      this.applyFilters(false);
    });
  }

  applyFilters(updateUrl: boolean = true): void {
    const q = this.search.trim().toLowerCase();
    this.filteredCars = this.cars.filter((car) => {
      const matchesType = this.selectedType === 'all' || car.typeKey === this.selectedType;
      const matchesSearch = !q || `${car.fullName} ${car.shortInfo} ${car.year}`.toLowerCase().includes(q);
      const matchesPrice = car.priceValue >= this.minPrice && car.priceValue <= (this.selectedMaxPrice || this.maxPrice || Infinity);
      const matchesCurrency = this.selectedCurrency === 'all' || car.currency === this.selectedCurrency;
      const matchesAvailability = this.selectedAvailability === 'all'
        || (this.selectedAvailability === 'available' && car.available)
        || (this.selectedAvailability === 'unavailable' && !car.available);
      return matchesType && matchesSearch && matchesPrice && matchesAvailability && matchesCurrency;
    });
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
    if (this.currentPage < 1) this.currentPage = 1;
    if (updateUrl) {
      this.router.navigate([], {
        replaceUrl: true,
        relativeTo: this.route,
        queryParams: {
          type: this.selectedType !== 'all' ? this.selectedType : null,
          status: this.selectedAvailability !== 'all' ? this.selectedAvailability : null,
          search: this.search || null,
          maxPrice: this.selectedMaxPrice && this.selectedMaxPrice !== this.maxPrice ? this.selectedMaxPrice : null,
          currency: this.selectedCurrency !== 'all' ? this.selectedCurrency : null,
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  get paginatedCars(): Car[] {
    const start = (this.currentPage - 1) * this.carsPerPage;
    return this.filteredCars.slice(start, start + this.carsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCars.length / this.carsPerPage);
  }

  goToPage(page: number): void { this.currentPage = page; }
  nextPage(): void { if (this.currentPage < this.totalPages) this.currentPage++; }
  prevPage(): void { if (this.currentPage > 1) this.currentPage--; }
}
