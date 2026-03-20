import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  language: WritableSignal<string> = signal(localStorage.getItem('ccg-language') || 'geo');
  translations: WritableSignal<any> = signal({});

  constructor(private http: HttpClient) {
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
