import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-inputs',
  imports: [],
  templateUrl: './contact-inputs.component.html',
  styleUrl: './contact-inputs.component.scss'
})
export class ContactInputsComponent {
  @Input() label: string = "";
  @Input() value: string = "";
}
