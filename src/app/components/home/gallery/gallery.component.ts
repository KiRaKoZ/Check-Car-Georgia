import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  cars: any[] = [];
  
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;

  constructor(
    private http: HttpClient
  ) {
    this.loadCars();
  }
  loadCars() {
    this.http.get<any>('i18n/eng.json').subscribe((data) => {
      this.cars = data.cars;
    });
}
}
