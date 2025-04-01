import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  language: WritableSignal<string> = signal('eng');
  translations: WritableSignal<any> = signal({});

  constructor(private http: HttpClient) {
    this.loadTranslations(this.language());
  }

  loadTranslations(lang: string) {
    this.http.get(`i18n/${lang}.json`).subscribe((data) => {
      
      this.translations.set(data);
      this.language.set(lang);
    });
  }

  changeLanguage(lang: string) {
    this.loadTranslations(lang);
  }
}
