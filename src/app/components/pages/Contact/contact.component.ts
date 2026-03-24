import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  contactForm: FormGroup;
  showErrorModal = false;
  showSuccessModal = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  // Check if control is invalid and touched or dirty
  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  // Submit the form
  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched(); // Show all validation errors
      this.showErrorModal = true;
      return;
    }

    // Send form data via EmailJS
    const formData = {
      firstName: this.contactForm.value.firstName,
      lastName: this.contactForm.value.lastName,
      email: this.contactForm.value.email,
      phone: this.contactForm.value.phone,
      comment: this.contactForm.value.comment,
    };

    emailjs
      .send(
        'service_yfpihl9',
        'template_i3t2kzh',
        formData,
        'mpnnoDB3G-LpH2b5s',
      )
      .then((response) => {
        console.log('SUCCESS!', response);
        this.showSuccessModal = true;
        this.contactForm.reset();
      })
      .catch((error) => {
        console.error('FAILED...', error);
        this.showErrorModal = true;
      });
  }

  // Close error modal
  closeErrorModal(): void {
    this.showErrorModal = false;
  }

  // Close success modal
  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }


  images = [
    {
      src: 'icons/facebook.svg',
      alt: 'Facebook',
      link: 'https://www.facebook.com/checkcar.georgia.2025/',
    },
    {
      src: 'icons/threads.svg',
      alt: 'Threads',
      link: 'http://threads.com/@check_car_georgia',
    },
    {
      src: 'icons/whatsapp.svg',
      alt: 'WhatsApp',
      link: 'https://wa.me/995571525055',
    },
    {
      src: 'icons/tiktok.svg',
      alt: 'TikTok',
      link: 'https://www.tiktok.com/@checkcargeorgia',
    },
    {
      src: 'icons/viber.svg',
      alt: 'Viber',
      link: 'viber://chat?number=%2B995571525055',
    },
    {
      src: 'icons/youtube.svg',
      alt: 'YouTube',
      link: 'https://www.youtube.com/@CheckCarGeorgia',
    },
    {
      src: 'icons/telegram.svg',
      alt: 'Telegram',
      link: 'https://t.me/+F5In7dVI8g5hMmYy',
    },
  ];
}
