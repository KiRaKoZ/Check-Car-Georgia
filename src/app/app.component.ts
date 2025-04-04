import { Component, HostListener,  } from '@angular/core';
import {RouterOutlet, RouterModule, Router  } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { PagesHeaderComponent } from './components/layouts/pages-header/pages-header.component';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,  
    CommonModule,
    HeaderComponent,
    FooterComponent,
    RouterModule,
    PagesHeaderComponent,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  isVisible = false; 

  
  constructor(private router: Router,) {}
  title = 'Check-Car-Georgia';

  isHomePage(): boolean {
    return this.router.url === '/'; 
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isVisible = window.scrollY > 300; 
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}



