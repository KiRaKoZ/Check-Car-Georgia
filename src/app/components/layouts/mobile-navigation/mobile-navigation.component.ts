import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Renderer2, Signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mobile-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './mobile-navigation.component.html',
  styleUrl: './mobile-navigation.component.scss'
})
export class MobileNavigationComponent implements OnInit{
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
    { name: 'English', code: 'eng', flag: 'images/eng.svg', font: 'DM Sans'},
    { name: 'ქართული', code: 'geo', flag: 'images/geo.svg', font: 'Noto Serif Georgian' },
    { name: 'Русский', code: 'rus', flag: 'images/rus.svg', font: 'Noto Serif Georgian' }
  ];

  images = [
    { src: 'icons/twitter-x.svg', alt: 'Twitter', link: 'https://twitter.com' },
    { src: 'icons/facebook.svg', alt: 'Facebook', link: 'https://facebook.com' },
    { src: 'icons/threads.svg', alt: 'Threads', link: 'https://www.threads.net' },
    { src: 'icons/tiktok.svg', alt: 'TikTok', link: 'https://www.tiktok.com' },
    { src: 'icons/viber.svg', alt: 'Viber', link: 'https://www.viber.com' },
    { src: 'icons/whatsapp.svg', alt: 'WhatsApp', link: 'https://www.whatsapp.com' },
    { src: 'icons/youtube.svg', alt: 'YouTube', link: 'https://www.youtube.com' },
    { src: 'icons/instagram.svg', alt: 'Instagram', link: 'https://www.instagram.com' },
    { src: 'icons/telegram.svg', alt: 'Telegram', link: 'https://telegram.org' },
  
  ];

  constructor(
    private renderer: Renderer2,
    public router: Router
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
    return this.router.url.includes('gallery') || 
           this.router.url.includes('service-page') ||  
           this.router.url.includes('calculator');
  }

  changeLanguage(langCode: string) {
    const selectedLang = this.languages.find(lang => lang.code === langCode);
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



}
