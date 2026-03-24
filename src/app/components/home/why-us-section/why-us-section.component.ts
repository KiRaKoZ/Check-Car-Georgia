import { Component, inject, Signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-why-us-section',
  imports: [],
  templateUrl: './why-us-section.component.html',
  styleUrl: './why-us-section.component.scss',
})
export class WhyUsSectionComponent {
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;
}
