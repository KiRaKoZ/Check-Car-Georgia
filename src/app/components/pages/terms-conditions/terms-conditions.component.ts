import { CommonModule } from '@angular/common';
import { Component, Signal, computed, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

interface TermsCard {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.scss',
})
export class TermsConditionsComponent {
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;

  termsCards = computed<TermsCard[]>(() => {
    const t = this.translations()?.terms;

    return [
      {
        icon: 'privacy_tip',
        title: t?.privacyTitle,
        description: t?.privacyDescription,
      },
      {
        icon: 'description',
        title: t?.rentalTitle,
        description: t?.rentalDescription,
      },
      {
        icon: 'badge',
        title: t?.ageTitle,
        description: t?.ageDescription,
      },
      {
        icon: 'verified_user',
        title: t?.insuranceTitle,
        description: t?.insuranceDescription,
      },
      {
        icon: 'gavel',
        title: t?.penaltiesTitle,
        description: t?.penaltiesDescription,
      },
      {
        icon: 'event_busy',
        title: t?.cancellationTitle,
        description: t?.cancellationDescription,
      },
    ];
  });
}
