import { CommonModule } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  lastUrl: string = '';
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.lastUrl = event.url;
        console.log('404 triggered from:', this.lastUrl);
      }
    });
  }
}
