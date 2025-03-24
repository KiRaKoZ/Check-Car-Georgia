import { Component } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CommonModule } from '@angular/common';
import { ContactLocationComponent } from './contact-location/contact-location.component';
import { ContactInputsComponent } from './contact-inputs/contact-inputs.component';
import { ContactDetailsCardComponent } from './contact-details-card/contact-details-card.component';
import { ContactButtonComponent } from './contact-button/contact-button.component';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    ContactFormComponent,
    ContactLocationComponent,
    // ContactInputsComponent,
    ContactDetailsCardComponent,
    // ContactButtonComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
