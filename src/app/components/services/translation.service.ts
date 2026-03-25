import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  language: WritableSignal<string> = signal(
    localStorage.getItem('ccg-language') || 'geo',
  );

  translations: WritableSignal<any> = signal({});

  constructor(private http: HttpClient) {
    effect(() => {
      const lang = this.language();

      if (typeof document === 'undefined') return;

      document.documentElement.setAttribute(
        'lang',
        lang === 'geo' ? 'ka' : lang === 'eng' ? 'en' : 'ru',
      );

      document.body.classList.remove('lang-geo', 'lang-eng', 'lang-rus');
      document.body.classList.add(`lang-${lang}`);

      localStorage.setItem('ccg-language', lang);
    });

    this.loadTranslations(this.language());
  }

  loadTranslations(lang: string): void {
    this.http.get(`i18n/${lang}.json`).subscribe({
      next: (data) => {
        this.translations.set(data);
        this.language.set(lang);
      },
      error: (error) => {
        console.error(`Translation file could not be loaded: ${lang}`, error);
      },
    });
  }

  changeLanguage(lang: string): void {
    if (!lang || this.language() === lang) return;
    this.loadTranslations(lang);
  }

  getCurrentLanguage(): string {
    return this.language();
  }

  getTranslations() {
    return this.translations;
  }
}
