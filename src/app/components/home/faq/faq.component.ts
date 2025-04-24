import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}
@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ height: 0, opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ height: '*', opacity: 1, transform: 'translateY(0)' })
        )
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ height: 0, opacity: 0, transform: 'translateY(-10px)' })
        )
      ])
    ])
  ]
})
export class FAQComponent {
    faqItems: FaqItem[] = [
      {
        question: 'Does BoxCar own the cars I see online or are they owned by others?',
        answer: 'Cras vitae ac nunc orci. Purus amet tortor non at phasellus ultricies hendrerit. Eget a, sit morbi nunc sit id massa. Metus, scelerisque volutpat nec sit vel donec. Sagittis, id volutpat erat vel.',
        isOpen: false
      },
      {
        question: 'How do you choose the cars that you sell?',
        answer: 'We carefully select our inventory based on quality, performance, and market demand. Our team of experts evaluates each vehicle thoroughly before it',
        isOpen: false
      },
      {
        question: 'Can I save my favorite cars to a list I can view later?',
        answer: 'Yes, you can create an account and save your favorite cars to a personalized list for easy access later.',
        isOpen: false
      },
      {
        question: 'Can I be notified when cars I like are added to your inventory?',
        answer: 'Absolutely! You can set up alerts for specific makes, models, or features, and we.',
        isOpen: false
      },
      {
        question: 'What tools do you have to help me find the right car for me and my budget?',
        answer: 'We offer a range of tools including a budget calculator, comparison tool, and personalized recommendations based on your preferences and financial situation.',
        isOpen: false
      }
    ];
  
    toggleFaq(index: number): void {
      this.faqItems = this.faqItems.map((item, i) => ({
        ...item,
        isOpen: i === index ? !item.isOpen : false
      }));
    }
    
  }