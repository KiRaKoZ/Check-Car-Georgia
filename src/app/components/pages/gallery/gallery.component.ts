import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';

interface Car {
  name: string;
  info: string; // translation key
  type: string;
  price: string;
  per: string;
  fuel: string;
  transmission: string;
  year: number;
  engine: string;
  images: string[];
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  imports: [CommonModule]
})
export class GalleryComponent implements OnInit {
  private http = inject(HttpClient);
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;

  cars: Car[] = [];
  filteredCars: Car[] = [];
  currentPage = 1;
  carsPerPage = 3; // Set this to 3 for showing 3 cars per page
  carNames: string[] = [];

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.http.get<{ cars: Car[] }>('i18n/eng.json').subscribe((res) => {
      this.cars = res.cars;
      this.filteredCars = res.cars;
      this.carNames = [...new Set(res.cars.map((car) => car.name))];
    });
  }

  filterByName(name: string) {
    this.filteredCars = this.cars.filter((car) => car.name === name);
    this.currentPage = 1; // Reset to first page when filtering by name
  }

  showAll() {
    this.filteredCars = this.cars;
    this.currentPage = 1; // Reset to first page when showing all cars
  }

  getVisibleImages(car: Car): string[] {
    // In the "single car" view, show all images
    return this.filteredCars.length === 1 ? car.images : car.images.slice(0, 3);
  }

  get paginatedCars(): Car[] {
    const start = (this.currentPage - 1) * this.carsPerPage;
    return this.filteredCars.slice(start, start + this.carsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCars.length / this.carsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
