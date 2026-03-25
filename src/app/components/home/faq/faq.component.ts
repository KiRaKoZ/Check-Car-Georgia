import { CommonModule } from '@angular/common';
import { Component, Signal, effect, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FAQComponent {
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;

  faqItems: FaqItem[] = [];

  constructor() {
    effect(() => {
      const lang = this.translationService.language();
      this.faqItems = this.buildFaqItems(lang);
    });
  }

  get generalFaq(): FaqItem[] {
    return this.faqItems.slice(0, 5);
  }

  get paymentsFaq(): FaqItem[] {
    return this.faqItems.slice(5, 10);
  }

  private buildFaqItems(lang: string): FaqItem[] {
    const map: Record<string, FaqItem[]> = {
      geo: [
        {
          question: 'როდის არის ავტომობილი თავისუფალი?',
          answer:
            'თუ ავტომობილი საიტზე აქტიურად ჩანს, ის ხელმისაწვდომია ან შესაძლებელია მისი წინასწარი დაჯავშნა. საბოლოო დადასტურებას ოპერატორი სწრაფად გაწვდით.',
          isOpen: true,
        },
        {
          question: 'შესაძლებელია ავტომობილის დაჯავშნა?',
          answer:
            'დიახ, შეგიძლიათ სასურველი ავტომობილი დაჯავშნოთ ნებისმიერ მომავალ თარიღზე.',
          isOpen: false,
        },
        {
          question: 'მინიმუმ რამდენი დღით აქირავებთ?',
          answer: 'ქირაობის მინიმალური ვადაა 3 დღე.',
          isOpen: false,
        },
        {
          question: 'გადაცემათა კოლოფი მექანიკურია თუ ავტომატური?',
          answer:
            'ჩვენთან ყველა ავტომობილი ავტომატური გადაცემათა კოლოფით არის.',
          isOpen: false,
        },
        {
          question: 'წვა საშუალოდ რამდენი აქვს კონკრეტულ ავტომობილს?',
          answer:
            'საწვავის ხარჯი ინდივიდუალურია და კონკრეტულ მოდელზეა დამოკიდებული. ზუსტი მონაცემი იხილეთ ავტომობილის გვერდზე.',
          isOpen: false,
        },
        {
          question: 'რა არის საჭირო ქირაობისთვის?',
          answer:
            'საჭიროა მართვის მოწმობა, პირადობა ან პასპორტი. პირი უნდა იყოს მინიმუმ 22 წლის და ჰქონდეს მინიმუმ 2 წლიანი მართვის გამოცდილება.',
          isOpen: false,
        },
        {
          question: 'არის თუ არა ლიმიტი გავლილ კმ-ზე 24 საათში?',
          answer: 'არა, გავლილი კილომეტრების ლიმიტი არ მოქმედებს.',
          isOpen: false,
        },
        {
          question: 'საგზაო შემთხვევის დროს როგორ ვიქცევით?',
          answer:
            'არ გადაადგილოთ ავტომობილი. დაუყოვნებლივ დაუკავშირდით Check Car Georgia-ს, სადაზღვევოს და საპატრულო პოლიციას.',
          isOpen: false,
        },
        {
          question:
            'ავტომობილის ტექნიკურ დაზიანებაზე პასუხისმგებლობა ვის ეკისრება?',
          answer:
            'ყველა ავტომობილი ტექნიკურად გამართული გადაეცემა დამქირავებელს. ცვეთადი ნაწილების გარდა პასუხისმგებლობა ეკისრება დამქირავებელს.',
          isOpen: false,
        },
        {
          question: 'შესაძლებელია აეროპორტში დახვედრა?',
          answer:
            'დიახ, შესაძლებელია როგორც აეროპორტში დახვედრა, ისე ავტომობილის გადაცემა/ჩაბარება თქვენთვის სასურველ ლოკაციაზე შეთანხმებით.',
          isOpen: false,
        },
      ],
      rus: [
        {
          question: 'Когда автомобиль свободен?',
          answer:
            'Если автомобиль виден на сайте, значит он доступен или доступен для бронирования. Окончательное подтверждение дает оператор.',
          isOpen: true,
        },
        {
          question: 'Можно ли забронировать автомобиль заранее?',
          answer:
            'Да, вы можете забронировать любой автомобиль на любую будущую дату.',
          isOpen: false,
        },
        {
          question: 'Какой минимальный срок аренды?',
          answer: 'Минимальный срок аренды — 3 дня.',
          isOpen: false,
        },
        {
          question: 'Коробка передач механика или автомат?',
          answer: 'Все автомобили у нас с автоматической коробкой передач.',
          isOpen: false,
        },
        {
          question: 'Какой средний расход топлива?',
          answer:
            'Расход топлива зависит от конкретной модели. Точную информацию смотрите на странице авто.',
          isOpen: false,
        },
        {
          question: 'Что нужно для аренды?',
          answer:
            'Нужны водительские права, удостоверение личности или паспорт. Возраст водителя — от 22 лет и минимум 2 года стажа.',
          isOpen: false,
        },
        {
          question: 'Есть ли лимит пробега в сутки?',
          answer: 'Нет, лимита по пробегу нет.',
          isOpen: false,
        },
        {
          question: 'Что делать при ДТП?',
          answer:
            'Не перемещайте автомобиль. Сразу свяжитесь с Check Car Georgia, страховой компанией и патрульной полицией.',
          isOpen: false,
        },
        {
          question: 'Кто отвечает за технические повреждения?',
          answer:
            'Автомобили передаются технически исправными. За повреждения, кроме естественного износа, отвечает арендатор.',
          isOpen: false,
        },
        {
          question: 'Возможна ли встреча в аэропорту?',
          answer:
            'Да, возможна встреча в аэропорту и передача/возврат авто в удобной точке по согласованию.',
          isOpen: false,
        },
      ],
      eng: [
        {
          question: 'When is the vehicle available?',
          answer:
            'If the vehicle is visible on the website, it is available or open for advance booking. Final confirmation is provided by our team.',
          isOpen: true,
        },
        {
          question: 'Can I reserve a vehicle in advance?',
          answer: 'Yes, you can reserve any vehicle for any future date.',
          isOpen: false,
        },
        {
          question: 'What is the minimum rental period?',
          answer: 'The minimum rental period is 3 days.',
          isOpen: false,
        },
        {
          question: 'Are the cars manual or automatic?',
          answer: 'All vehicles in our fleet have automatic transmission.',
          isOpen: false,
        },
        {
          question: 'What is the average fuel consumption?',
          answer:
            'Fuel consumption depends on the specific vehicle. You can check the exact model page for details.',
          isOpen: false,
        },
        {
          question: 'What do I need to rent a car?',
          answer:
            'You need a valid driving licence, ID card or passport. The renter must be at least 22 years old and have at least 2 years of driving experience.',
          isOpen: false,
        },
        {
          question: 'Is there a mileage limit per 24 hours?',
          answer: 'No, there is no mileage limit.',
          isOpen: false,
        },
        {
          question: 'What should I do in case of an accident?',
          answer:
            'Do not move the vehicle. Contact Check Car Georgia, the insurance company and the patrol police immediately.',
          isOpen: false,
        },
        {
          question: 'Who is responsible for technical damage?',
          answer:
            'All cars are delivered in proper technical condition. Apart from normal wear parts, responsibility lies with the renter.',
          isOpen: false,
        },
        {
          question: 'Is airport delivery available?',
          answer:
            'Yes, airport pick-up and custom delivery/return locations are available by arrangement.',
          isOpen: false,
        },
      ],
    };

    return map[lang] || map['eng'];
  }

  toggleFaq(index: number): void {
    this.faqItems = this.faqItems.map((item, i) =>
      i === index
        ? { ...item, isOpen: !item.isOpen }
        : { ...item, isOpen: false },
    );
  }

  toggleFaqByGroup(group: 'general' | 'payments', localIndex: number): void {
    const globalIndex = group === 'general' ? localIndex : localIndex + 5;
    this.toggleFaq(globalIndex);
  }
}
