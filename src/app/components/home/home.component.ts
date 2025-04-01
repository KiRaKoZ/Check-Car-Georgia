import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { LoanCalculatorComponent } from './loan-calculator/loan-calculator.component';
import { VehicleListingComponent } from './vehicle-listing/vehicle-listing.component';
import { WhyUsSectionComponent } from './why-us-section/why-us-section.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ScrollFadeDirective } from './scroll-fade.directive';
import { VehicleTypesComponent } from './vehicle-types/vehicle-types.component';
import { SocialSectionComponent } from './social-section/social-section.component';
import { VideoSectionComponent } from './video-section/video-section.component';
import { BookingSectionComponent } from './booking-section/booking-section.component';
import { FAQComponent } from './faq/faq.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule, 
    HeroSectionComponent,
    LoanCalculatorComponent,
    VehicleListingComponent,
    WhyUsSectionComponent,
    GalleryComponent,
    ScrollFadeDirective,
    // VehicleTypesComponent,
    SocialSectionComponent,
    VideoSectionComponent,
    BookingSectionComponent,
    FAQComponent,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
