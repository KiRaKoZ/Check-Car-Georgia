import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-service-page',
  imports: [CommonModule, FormsModule],
  standalone:true,
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.scss'
})
export class ServicePageComponent {
  formData: {
    name: string;
    email: string;
    phone: string;
    model: string;
    mileage?: number;
    bestTime: string;
  } = {
    name: '',
    email: '',
    phone: '',
    model: '',
    mileage: undefined,
    bestTime: '',
  };

  onSubmit() {
    console.log('Form submitted', this.formData);
  }
}
