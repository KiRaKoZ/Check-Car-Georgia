import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-booking-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './booking-section.component.html',
  styleUrl: './booking-section.component.scss'
})
export class BookingSectionComponent {
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;
}
