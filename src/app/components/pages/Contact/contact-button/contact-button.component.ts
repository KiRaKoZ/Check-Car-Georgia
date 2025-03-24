import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-button',
  imports: [CommonModule],
  templateUrl: './contact-button.component.html',
  styleUrl: './contact-button.component.scss'
})
export class ContactButtonComponent {
  @Input() text: string = "";
  @Input() buttonClass: string =
    "px-7 py-5 text-base font-medium leading-loose text-white bg-blue-600 rounded-xl border border-solid border-[color:var(--Color-Secondary,#405FF2)] max-md:px-5";
  @Input() showArrow: boolean = true;
  @Input() arrowIcon: string =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/29e76d808bb70b107e943c36a7b44a168d2c0c58?placeholderIfAbsent=true&apiKey=f00c02c049754371a6df486ba807890f";
  @Input() type: "button" | "submit" | "reset" = "button";
}
