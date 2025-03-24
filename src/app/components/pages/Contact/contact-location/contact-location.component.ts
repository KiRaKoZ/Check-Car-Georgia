import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-location',
  imports: [CommonModule],
  templateUrl: './contact-location.component.html',
  styleUrl: './contact-location.component.scss'
})
export class ContactLocationComponent {
  @Input() location: string = "";
  @Input() address: string = "";
  @Input() email: string = "";
  @Input() phone: string = "";
  @Input() isMainHeading: boolean = true;

  constructor() {
    // The first instance will show the main heading
    this.isMainHeading = this.location === "San Francisco";
  }

  ngOnInit() {
    // Set isMainHeading to true only for San Francisco
    this.isMainHeading = this.location === "San Francisco";
  }
}
