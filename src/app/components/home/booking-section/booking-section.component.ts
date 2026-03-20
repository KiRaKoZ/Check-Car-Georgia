import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-booking-section',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './booking-section.component.html',
  styleUrl: './booking-section.component.scss'
})
export class BookingSectionComponent {
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;
  searchOpen = false;
  bookingSearch = '';
  bookingMenu = [
    'აირჩიე მანქანა',
    'დაადასტურე თარიღი',
    'გაგზავნე მოთხოვნა',
    'დაელოდე პასუხს',
  ];
  toggleSearch(): void { this.searchOpen = !this.searchOpen; }
}
