import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;

  images = [
    { src: 'icons/facebook.svg', alt: 'Facebook', link: 'https://www.facebook.com/checkcar.georgia.2025/' },
    { src: 'icons/threads.svg', alt: 'Threads', link: 'http://threads.com/@check_car_georgia' },
    { src: 'icons/whatsapp.svg', alt: 'WhatsApp', link: 'https://wa.me/995571525055' },
    { src: 'icons/tiktok.svg', alt: 'TikTok', link: 'https://www.tiktok.com/@checkcargeorgia' },
    { src: 'icons/viber.svg', alt: 'Viber', link: 'viber://chat?number=%2B995571525055' },
    { src: 'icons/youtube.svg', alt: 'YouTube', link: 'https://www.youtube.com/@CheckCarGeorgia' },
    { src: 'icons/telegram.svg', alt: 'Telegram', link: 'https://t.me/+F5In7dVI8g5hMmYy' }
  ];
}
