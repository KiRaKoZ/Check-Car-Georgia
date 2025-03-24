import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { LoanCalculatorComponent } from './loan-calculator/loan-calculator.component';
import { VehicleListingComponent } from './vehicle-listing/vehicle-listing.component';
import { WhyUsSectionComponent } from './why-us-section/why-us-section.component';
import { GalleryComponent } from './gallery/gallery.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule, 
    HeroSectionComponent,
    LoanCalculatorComponent,
    VehicleListingComponent,
    WhyUsSectionComponent,
    GalleryComponent

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
