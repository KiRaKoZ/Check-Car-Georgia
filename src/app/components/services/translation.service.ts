import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
    private currentLanguage: string = 'en';  // Default language
    private translationsSubject = new BehaviorSubject<any>({});
    public currentTranslations = this.translationsSubject.asObservable();
  
    constructor(private http: HttpClient) {
      this.loadLanguage(this.currentLanguage);
    }
  
    // Method to change language
    changeLanguage(language: string) {
      this.currentLanguage = language;
      localStorage.setItem('language', language);  // Store selected language
      this.loadLanguage(language);
    }
  
    // Get the current translation for the selected language
    getTranslation(): any {
      return this.translationsSubject.getValue();
    }
  
    private loadLanguage(language: string) {
      // Load the translation from the corresponding JSON file
      this.http.get(`i18n/${language}.json`).subscribe(
        (translations) => {
          this.translationsSubject.next(translations);
        },
        (error) => {
          console.error(`Could not load language file for: ${language}`, error);
        }
      );
    }
}