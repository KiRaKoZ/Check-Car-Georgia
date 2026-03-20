import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WhyUsSectionComponent } from '../../home/why-us-section/why-us-section.component';
import { FAQComponent } from '../../home/faq/faq.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, WhyUsSectionComponent,FAQComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {


  startYear = 2010;
  currentYear = new Date().getFullYear();
  yearsInBusiness = this.currentYear - this.startYear;
}
