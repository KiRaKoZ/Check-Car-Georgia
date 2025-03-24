import { Component } from '@angular/core';
import { ContactInputsComponent } from '../contact-inputs/contact-inputs.component';
import { ContactButtonComponent } from '../contact-button/contact-button.component';

@Component({
  selector: 'app-contact-form',
  imports: [ContactInputsComponent, ContactButtonComponent],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {

}
