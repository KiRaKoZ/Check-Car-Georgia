import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, of, shareReplay } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { toObservable } from '@angular/core/rxjs-interop';
import { Car } from '../../models/car.model';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root',
})
export class CarDataService {
  private http = inject(HttpClient);
  private translationService = inject(TranslationService);

  private lang$ = toObservable(this.translationService.language);
  private apiBaseUrl = this.getApiBaseUrl();

  private rawCars$ = this.http.get<any[]>(`${this.apiBaseUrl}/api/cars`).pipe(
    catchError(() => this.http.get<any[]>('data/cars.json')),
    catchError(() => of([])),
    shareReplay(1)
  );

  private cars$ = combineLatest([this.rawCars$, this.lang$]).pipe(
    map(([cars, lang]) => cars.map((car) => this.normalizeCar(car, lang || 'geo'))),
    shareReplay(1)
  );

  getCars(): Observable<Car[]> {
    return this.cars$;
  }

  private getApiBaseUrl(): string {
    if (typeof window === 'undefined') return '';
    const { hostname, port, origin } = window.location;
    if ((hostname === 'localhost' || hostname === '127.0.0.1') && port === '4200') {
      return 'http://localhost:4100';
    }
    return origin;
  }

  private normalizeCar(raw: any, lang: string): Car {
    const typeKey = this.normalizeTypeKey(raw.typeKey || raw.type || 'suv');
    const fuelKey = this.normalizeFuelKey(raw.fuelKey || raw.fuel || 'petrol');
    const transmissionKey = this.normalizeTransmissionKey(raw.transmissionKey || raw.transmission || 'automatic');
    const currency = this.normalizeCurrency(raw.currency || raw.priceCurrency || raw.currencyCode || raw.price);
    const priceValue = this.normalizePriceValue(raw.priceValue ?? raw.price);
    const brand = this.pickLocalized(raw.brand, lang);
    const name = this.pickLocalized(raw.name, lang);
    const description = this.pickLocalized(raw.description, lang);
    const fullName = [brand, name].filter(Boolean).join(' ').trim() || raw.fullName || raw.name || raw.brand || '';
    const rawImages = Array.isArray(raw.images) ? raw.images : [];
    const images = rawImages.map((img: string) => this.resolveImageUrl(img)).filter(Boolean);
    const primaryImage = this.resolveImageUrl(raw.image || rawImages[0] || images[0] || 'images/rentCar.jpeg');
    const displayImages = images.length ? images : [primaryImage];
    const available = raw.available !== false && raw.available !== 'false';

    return {
      id: Number(raw.id || Date.now()),
      slug: raw.slug || `car-${Date.now()}`,
      brand,
      name: name || brand,
      fullName,
      shortInfo: raw.shortInfo || this.buildShortInfo(raw.engine, transmissionKey, typeKey, lang),
      description,
      type: this.localizeType(typeKey, lang),
      typeKey,
      price: `${currency === 'USD' ? '$' : '₾'}${priceValue}`,
      priceValue,
      currency,
      per: this.localizePer(lang),
      fuel: this.localizeFuel(fuelKey, lang),
      fuelKey,
      transmission: this.localizeTransmission(transmissionKey, lang),
      transmissionKey,
      year: Number(raw.year || 0),
      engine: raw.engine || '',
      consumption: raw.consumption || raw.fuelConsumption || '',
      seats: Number(raw.seats || 5),
      doors: Number(raw.doors || 4),
      location: '',
      available,
      featured: Boolean(raw.featured),
      image: primaryImage,
      images: displayImages,
      features: this.normalizeFeatures(raw.features, lang),
      video: this.resolveVideoUrl(raw.video || raw.videoUrl || ''),
      raw,
    };
  }

  private pickLocalized(value: any, lang: string): string {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object') {
      return value[lang] || value.geo || value.eng || value.rus || '';
    }
    return String(value);
  }

  private normalizeFeatures(value: any, lang: string): string[] {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value.map((item) => this.pickLocalized(item, lang)).filter(Boolean);
    }
    if (typeof value === 'string') {
      return value.split(',').map((item) => item.trim()).filter(Boolean);
    }
    return [];
  }

  private resolveImageUrl(path: string): string {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    if (path.startsWith('/uploads/')) return `${this.apiBaseUrl}${path}`;
    if (path.startsWith('uploads/')) return `${this.apiBaseUrl}/${path}`;
    if (path.startsWith('/images/') || path.startsWith('/icons/') || path.startsWith('/videos/')) return path;
    if (path.startsWith('images/') || path.startsWith('icons/') || path.startsWith('videos/')) return `/${path}`;
    return `/${path.replace(/^\//, '')}`;
  }

  private resolveVideoUrl(path: string): string {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    if (path.startsWith('/uploads/')) return `${this.apiBaseUrl}${path}`;
    if (path.startsWith('uploads/')) return `${this.apiBaseUrl}/${path}`;
    if (path.startsWith('/videos/')) return path;
    if (path.startsWith('videos/')) return `/${path}`;
    return `/${path.replace(/^\//, '')}`;
  }

  private normalizePriceValue(value: any): number {
    if (typeof value === 'number') return value;
    const numeric = Number(String(value || '0').replace(/[^\d.]/g, ''));
    return Number.isFinite(numeric) ? numeric : 0;
  }

  private normalizeCurrency(value: any): 'GEL' | 'USD' {
    const input = String(value || '').toUpperCase();
    if (input.includes('USD') || input.includes('$')) return 'USD';
    return 'GEL';
  }

  private normalizeTypeKey(value: string): string {
    const v = String(value || '').toLowerCase();
    if (v.includes('coup')) return 'coupe';
    if (v.includes('cab')) return 'cabriolet';
    if (v.includes('hatch')) return 'hatchback';
    if (v.includes('sed')) return 'sedan';
    return 'suv';
  }

  private normalizeFuelKey(value: string): string {
    const v = String(value || '').toLowerCase();
    if (v.includes('elec')) return 'electric';
    if (v.includes('dies')) return 'diesel';
    if (v.includes('hyb')) return 'hybrid';
    return 'petrol';
  }

  private normalizeTransmissionKey(value: string): string {
    const v = String(value || '').toLowerCase();
    return v.includes('man') ? 'manual' : 'automatic';
  }

  private localizePer(lang: string): string {
    return ({ geo: 'დღე', eng: 'Day', rus: 'День' } as Record<string, string>)[lang] || 'Day';
  }

  private localizeType(key: string, lang: string): string {
    const map: Record<string, Record<string, string>> = {
      sedan: { geo: 'სედანი', eng: 'Sedan', rus: 'Седан' },
      coupe: { geo: 'კუპე', eng: 'Coupe', rus: 'Купе' },
      cabriolet: { geo: 'კაბრიოლეტი', eng: 'Cabriolet', rus: 'Кабриолет' },
      hatchback: { geo: 'ჰეტჩბექი', eng: 'Hatchback', rus: 'Хэтчбек' },
      suv: { geo: 'SUV', eng: 'SUV', rus: 'SUV' },
    };
    return map[key]?.[lang] || map[key]?.['eng'] || key;
  }

  private localizeFuel(key: string, lang: string): string {
    const map: Record<string, Record<string, string>> = {
      electric: { geo: 'ელექტრო', eng: 'Electric', rus: 'Электро' },
      diesel: { geo: 'დიზელი', eng: 'Diesel', rus: 'Дизель' },
      hybrid: { geo: 'ჰიბრიდი', eng: 'Hybrid', rus: 'Гибрид' },
      petrol: { geo: 'ბენზინი', eng: 'Petrol', rus: 'Бензин' },
    };
    return map[key]?.[lang] || map[key]?.['eng'] || key;
  }

  private localizeTransmission(key: string, lang: string): string {
    const map: Record<string, Record<string, string>> = {
      automatic: { geo: 'ავტომატური', eng: 'Automatic', rus: 'Автомат' },
      manual: { geo: 'მექანიკური', eng: 'Manual', rus: 'Механика' },
    };
    return map[key]?.[lang] || map[key]?.['eng'] || key;
  }

  private buildShortInfo(engine: string, transmissionKey: string, typeKey: string, lang: string): string {
    return [engine, this.localizeTransmission(transmissionKey, lang), this.localizeType(typeKey, lang)]
      .filter(Boolean)
      .join(' • ');
  }
}
