import { Injectable, Signal, WritableSignal, signal, inject, effect } from '@angular/core';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root',
})
export class CarInfoService {
    private translationService = inject(TranslationService);
    carInfo: WritableSignal<any> = signal({});

  constructor() {
    effect(() => {
        const data = this.translationService.translations();
        if (data.car) {
          this.carInfo.set(data.car);
        }
      });
  }
}