import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { FormSubmitService } from '../../services/form-submit.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  private translationService = inject(TranslationService);
  private formSubmitService = inject(FormSubmitService);
  translations: Signal<any> = this.translationService.translations;
  subscriberEmail = '';
  subscribeMessage = '';
  subscribeError = false;
  socialLinks = [
    {
      src: 'icons/facebook.svg',
      label: 'Facebook',
      link: 'https://www.facebook.com/checkcar.georgia.2025/',
    },
    {
      src: 'icons/threads.svg',
      label: 'Threads',
      link: 'http://threads.com/@check_car_georgia',
    },
    {
      src: 'icons/whatsapp.svg',
      label: 'WhatsApp',
      link: 'https://wa.me/995571525055',
    },
    {
      src: 'icons/tiktok.svg',
      label: 'TikTok',
      link: 'https://www.tiktok.com/@checkcargeorgia',
    },
    {
      src: 'icons/viber.svg',
      label: 'Viber',
      link: 'viber://chat?number=%2B995571525055',
    },
    {
      src: 'icons/youtube.svg',
      label: 'YouTube',
      link: 'https://www.youtube.com/@CheckCarGeorgia',
    },
    {
      src: 'icons/telegram.svg',
      label: 'Telegram',
      link: 'https://t.me/+F5In7dVI8g5hMmYy',
    },
  ];

  subscribe(): void {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.subscriberEmail)) {
      this.subscribeError = true;
      this.subscribeMessage = this.translations()?.footer?.subscribeError;
      return;
    }
    this.formSubmitService
      .subscribe({ email: this.subscriberEmail })
      .subscribe({
        next: () => {
          this.subscribeError = false;
          this.subscribeMessage = this.translations()?.footer?.subscribeSuccess;
          this.subscriberEmail = '';
        },
        error: () => {
          this.subscribeError = true;
          this.subscribeMessage = this.translations()?.footer?.subscribeError;
        },
      });
  }
}
