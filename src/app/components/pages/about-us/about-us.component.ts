import { CommonModule } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { WhyUsSectionComponent } from '../../home/why-us-section/why-us-section.component';
import { FAQComponent } from '../../home/faq/faq.component';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, WhyUsSectionComponent, FAQComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;

  startYear = 2020;
  currentYear = new Date().getFullYear();
  yearsInBusiness = this.currentYear - this.startYear;
}
