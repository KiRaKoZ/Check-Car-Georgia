import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { PagesHeaderComponent } from './components/layouts/pages-header/pages-header.component';
import { BreadcrumbComponent } from './components/layouts/breadcrumb/breadcrumb.component';

import { BreadcrumbService } from './components/services/breadcrumb.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    PagesHeaderComponent,
    BreadcrumbComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isVisible = false;
  isHome = false;

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
  ) {
    if (
      typeof window !== 'undefined' &&
      'scrollRestoration' in window.history
    ) {
      window.history.scrollRestoration = 'manual';
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHome = this.checkIfHome(event.urlAfterRedirects);
        this.updateBreadcrumb(event.urlAfterRedirects);
        this.restoreScrollPosition(event.urlAfterRedirects);
      }
    });
  }

  checkIfHome(url: string): boolean {
    return url === '/' || url === '/home';
  }

  updateBreadcrumb(url: string): void {
    const parts = url
      .split('/')
      .filter((p) => p)
      .map((p) =>
        p.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      );

    this.breadcrumbService.setBreadcrumb(['Home', ...parts]);
  }

  private getScrollKey(url: string = this.router.url): string {
    return `scroll:${url}`;
  }

  private restoreScrollPosition(url: string): void {
    if (typeof window === 'undefined') return;

    const saved = sessionStorage.getItem(this.getScrollKey(url));

    requestAnimationFrame(() => {
      window.scrollTo({
        top: saved ? Number(saved) : 0,
        behavior: 'auto',
      });
    });
  }

  private persistScrollPosition(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(this.getScrollKey(), String(window.scrollY || 0));
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isVisible = window.scrollY > 300;
    this.persistScrollPosition();
  }

  @HostListener('window:beforeunload')
  onBeforeUnload(): void {
    this.persistScrollPosition();
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
