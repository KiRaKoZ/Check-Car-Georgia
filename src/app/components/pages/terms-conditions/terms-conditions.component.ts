import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-terms-conditions',
  imports: [CommonModule],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.scss',
  styles: [`
  
    .active {
      color: #2563eb;
    }
  `]
})
export class TermsConditionsComponent implements OnInit, AfterViewInit {
  @ViewChild('contentArea') contentArea!: ElementRef;

  navItems: string[] = [
    'Account & Payments',
    'Manage Orders',
    'Returns & Refunds',
    'COVID-19',
    'Other'
  ];

  contentSections = [
    {
      title: 'Introduction',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus nascetur morbi nisl, mi, in semper metus porttitor non. Augue nunc amet fringilla sit. Fringilla eget arcu sodales sed a, parturient fermentum amet scelerisque. Amet purus urna, dictumst aliquet aliquam natoque non, morbi pretium. Integer amet fermentum nibh viverra mollis consectetur arcu, ultrices dolor. Gravida purus arcu viverra eget. Aliquet tincidunt dignissim aliquam tempor nec id. Habitant suscipit sit semper duis odio amet, at.',
      additionalContent: 'Massa ultricies a arcu velit eget gravida purus ultrices eget. Orci, fames eu facilisi justo. Lacus netus a at sed justo vel leo leo pellentesque. Nulla ut laoreet luctus cum turpis et amet ac viverra. Vitae neque orci dui eu ac tincidunt. Egestas placerat egestas netus nec velit gravida consectetur laoreet vitae. Velit sed enim habitant habitant non diam. Semper tellus turpis tempus ac leo tempor. Ultricies amet, habitasse adipiscing bibendum consequat amet, sed. Id convallis suspendisse vitae, lacinia mattis cursus montes, dui. Tortor lobortis dignissim eget egestas. Eget enim auctor nunc eget mattis sollicitudin senectus diam. Tincidunt morbi egestas dignissim eget id aliquam.'
    },
    {
      title: 'Your Use of the Boxcar Sites',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus nascetur morbi nisl, mi, in semper metus porttitor non. Augue nunc amet fringilla sit. Fringilla eget arcu sodales sed a, parturient fermentum amet scelerisque. Amet purus urna, dictumst aliquet aliquam natoque non, morbi pretium. Integer amet fermentum nibh viverra mollis consectetur arcu, ultrices dolor. Gravida purus arcu viverra eget. Aliquet tincidunt dignissim aliquam tempor nec id. Habitant suscipit sit semper duis odio amet, at.',
      additionalContent: 'Massa ultricies a arcu velit eget gravida purus ultrices eget. Orci, fames eu facilisi justo. Lacus netus a at sed justo vel leo leo pellentesque. Nulla ut laoreet luctus cum turpis et amet ac viverra. Vitae neque orci dui eu ac tincidunt. Egestas placerat egestas netus nec velit gravida consectetur laoreet vitae. Velit sed enim habitant habitant non diam. Semper tellus turpis tempus ac leo tempor. Ultricies amet, habitasse adipiscing bibendum consequat amet, sed. Id convallis suspendisse vitae, lacinia mattis cursus montes, dui. Tortor lobortis dignissim eget egestas. Eget enim auctor nunc eget mattis sollicitudin senectus diam. Tincidunt morbi egestas dignissim eget id aliquam.'
    },
    {
      title: 'Content and Ideas',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus nascetur morbi nisl, mi, in semper metus porttitor non. Augue nunc amet fringilla sit. Fringilla eget arcu sodales sed a, parturient fermentum amet scelerisque. Amet purus urna, dictumst aliquet aliquam natoque non, morbi pretium. Integer amet fermentum nibh viverra mollis consectetur arcu, ultrices dolor. Gravida purus arcu viverra eget. Aliquet tincidunt dignissim aliquam tempor nec id. Habitant suscipit sit semper duis odio amet, at.',
      additionalContent: 'Massa ultricies a arcu velit eget gravida purus ultrices eget. Orci, fames eu facilisi justo. Lacus netus a at sed justo vel leo leo pellentesque. Nulla ut laoreet luctus cum turpis et amet ac viverra. Vitae neque orci dui eu ac tincidunt. Egestas placerat egestas netus nec velit gravida consectetur laoreet vitae. Velit sed enim habitant habitant non diam. Semper tellus turpis tempus ac leo tempor. Ultricies amet, habitasse adipiscing bibendum consequat amet, sed. Id convallis suspendisse vitae, lacinia mattis cursus montes, dui. Tortor lobortis dignissim eget egestas. Eget enim auctor nunc eget mattis sollicitudin senectus diam. Tincidunt morbi egestas dignissim eget id aliquam.'
    }
  ];

  activeIndex: number = 0;
  activeIndicatorTop: number = 0;

  ngOnInit(): void {
    this.setActive(0);
  }

  ngAfterViewInit(): void {
    this.scrollToActiveSection();
  }

  setActive(index: number): void {
    this.activeIndex = index;
    this.activeIndicatorTop = index * 45 + 14;
    this.scrollToActiveSection();
  }

  scrollToActiveSection(): void {
    if (this.contentArea) {
      const sections = this.contentArea.nativeElement.querySelectorAll('section');
      if (sections[this.activeIndex]) {
        sections[this.activeIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}