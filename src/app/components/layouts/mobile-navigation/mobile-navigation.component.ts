import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject, OnInit, Renderer2, Signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mobile-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './mobile-navigation.component.html',
  styleUrl: './mobile-navigation.component.scss',
})
export class MobileNavigationComponent implements OnInit {
  @Output() closeMenu = new EventEmitter<void>();
  isScrolled = false;
  isDarkMode = false;
  isDropdownOpen = false;
  selectedLanguage: string = 'English';
  selectedFlag: string = 'images/eng.svg';
  selectedFont: string = 'DM Sans';

  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;
  isSubMenuOpen = false;

  languages = [
    { name: 'English', code: 'eng', flag: 'images/eng.svg', font: 'DM Sans' },
    { name: 'ქართული', code: 'geo', flag: 'images/geo.svg', font: 'DM Sans' },
    { name: 'Русский', code: 'rus', flag: 'images/rus.svg', font: 'DM Sans' },
  ];

  images = [
    {
      src: 'icons/facebook.svg',
      alt: 'Facebook',
      link: 'https://www.facebook.com/checkcar.georgia.2025/',
    },
    {
      src: 'icons/threads.svg',
      alt: 'Threads',
      link: 'http://threads.com/@check_car_georgia',
    },
    {
      src: 'icons/whatsapp.svg',
      alt: 'WhatsApp',
      link: 'https://wa.me/995571525055',
    },
    {
      src: 'icons/tiktok.svg',
      alt: 'TikTok',
      link: 'https://www.tiktok.com/@checkcargeorgia',
    },
    {
      src: 'icons/viber.svg',
      alt: 'Viber',
      link: 'viber://chat?number=%2B995571525055',
    },
    {
      src: 'icons/youtube.svg',
      alt: 'YouTube',
      link: 'https://www.youtube.com/@CheckCarGeorgia',
    },
    {
      src: 'icons/telegram.svg',
      alt: 'Telegram',
      link: 'https://t.me/+F5In7dVI8g5hMmYy',
    },
  ];

  constructor(
    private renderer: Renderer2,
    public router: Router,
  ) {}

  currentYear: number = new Date().getFullYear();

  ngOnInit() {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      const selectedLang = JSON.parse(storedLanguage);
      this.selectedLanguage = selectedLang.name;
      this.selectedFlag = selectedLang.flag;
      this.selectedFont = selectedLang.font;
      this.translationService.changeLanguage(selectedLang.code);
      document.body.style.fontFamily = this.selectedFont;
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      this.renderer.addClass(document.documentElement, 'dark');
    }
  }

  isPageRouteActive(): boolean {
    return (
      this.router.url.includes('cars') ||
      this.router.url.includes('service-page') ||
      this.router.url.includes('booking-page') ||
      this.router.url.includes('calculator')
    );
  }

  changeLanguage(langCode: string) {
    const selectedLang = this.languages.find((lang) => lang.code === langCode);
    if (selectedLang) {
      this.translationService.changeLanguage(selectedLang.code);
      this.selectedLanguage = selectedLang.name;
      this.selectedFlag = selectedLang.flag;
      this.selectedFont = selectedLang.font;
      localStorage.setItem('selectedLanguage', JSON.stringify(selectedLang));
      document.body.style.fontFamily = this.selectedFont;
    }
  }

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  requestClose(): void {
    this.closeMenu.emit();
    this.isSubMenuOpen = false;
  }
}
