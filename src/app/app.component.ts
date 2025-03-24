import { Component } from '@angular/core';
import {RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,  
    CommonModule,
    HeaderComponent,
    FooterComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Check-Car-Georgia';
  
}



