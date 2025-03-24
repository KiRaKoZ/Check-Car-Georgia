import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isDarkMode = false;
  isDropdownOpen = false;
  selectedLanguage = 'English';
  selectedFlag = 'iamges/en.png';
  translations: any = {};

  languages = [
    { name: 'English', code: 'en', flag: 'images/eng.png', font: 'Bebas Neue' },
    { name: 'ქართული', code: 'ge', flag: 'images/geo.png', font: 'Noto Serif Georgian' },
    { name: 'Русский', code: 'ru', flag: 'images/rus.png', font: 'DM Sans 9pt' }
  ];

  constructor(
    private renderer: Renderer2,
    private http: HttpClient

  ) {}

  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 0;
  }
  ngOnInit() {
    const savedLang = localStorage.getItem('language') || 'eng';
    this.loadLanguage(savedLang);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      this.renderer.addClass(document.documentElement, 'dark');
    }
  }
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  changeLanguage(lang: any) {
    localStorage.setItem('language', lang.code);
    this.loadLanguage(lang.code);
    document.body.style.fontFamily = lang.font;
    this.isDropdownOpen = !this.isDropdownOpen;

  }

  loadLanguage(code: string) {
    const lang = this.languages.find(l => l.code === code);
    if (lang) {
      this.selectedLanguage = lang.name;
      this.selectedFlag = lang.flag;
      document.body.style.fontFamily = lang.font;
      
      this.http.get(`i18n/${code}.json`).subscribe(data => {
        this.translations = data;
      });
    }
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
