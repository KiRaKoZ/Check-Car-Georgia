import { Signal, inject, Component } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Component({
  standalone: true,
  template: '',
})
export abstract class BaseComponent {
  protected translationService = inject(TranslationService);
  public translations: Signal<any> = this.translationService.translations;
}