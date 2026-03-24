import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  language: WritableSignal<string> = signal(localStorage.getItem('ccg-language') || 'geo');
  translations: WritableSignal<any> = signal({});

  constructor(private http: HttpClient) {
    effect(() => {
      const lang = this.language();
      if (typeof document === 'undefined') return;
      document.documentElement.setAttribute('lang', lang === 'geo' ? 'ka' : lang);
      document.body.classList.remove('lang-geo', 'lang-eng', 'lang-rus');
      document.body.classList.add(`lang-${lang}`);
    });

    this.loadTranslations(this.language());
  }

  loadTranslations(lang: string) {
    this.http.get(`i18n/${lang}.json`).subscribe((data) => {
      this.translations.set(data);
      this.language.set(lang);
      localStorage.setItem('ccg-language', lang);
    });
  }

  changeLanguage(lang: string) {
    this.loadTranslations(lang);
  }
}
