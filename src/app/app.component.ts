import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { PagesHeaderComponent } from './components/layouts/pages-header/pages-header.component';
import { BreadcrumbComponent } from './components/layouts/breadcrumb/breadcrumb.component';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
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
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isVisible = false;
  isHome = false;

  constructor(private router: Router, private breadcrumbService: BreadcrumbService) {
    // Subscribe to router events to detect changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHome = this.checkIfHome(event.urlAfterRedirects);
        this.updateBreadcrumb(event.urlAfterRedirects);
      }
    });
  }

  // Check if current route is home
  checkIfHome(url: string): boolean {
    return url === '/' || url === '/home';
  }

  // Update the breadcrumb using the breadcrumb service
  updateBreadcrumb(url: string): void {
    const parts = url.split('/').filter(p => p).map(p => p.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
    this.breadcrumbService.setBreadcrumb(['Home', ...parts]);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isVisible = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
