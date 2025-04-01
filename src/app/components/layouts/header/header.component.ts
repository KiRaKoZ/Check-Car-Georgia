import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit, Renderer2, Signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { RouterLink } from '@angular/router';
// import { DropdownComponent } from '../../shared/ui/dropdown/dropdown.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isDarkMode = false;
  isDropdownOpen = false;
  selectedLanguage: string = 'English';
  selectedFlag: string = 'images/eng.png';
  selectedFont: string = 'DM Sans';
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;

  languages = [
    { name: 'English', code: 'eng', flag: 'images/eng.png', font: 'DM Sans'},
    { name: 'ქართული', code: 'geo', flag: 'images/geo.png', font: 'Noto Serif Georgian' },
    { name: 'Русский', code: 'rus', flag: 'images/rus.png', font: 'DM Sans 9pt' }
  ];

  constructor(
    private renderer: Renderer2,
  ) {}

  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 0;
  }
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
    this.isDropdownOpen = !this.isDropdownOpen;
    
  }
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    
    if (this.isDarkMode) {
      this.renderer.addClass(document.documentElement, 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
