import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  images = [
    { src: 'https://img.icons8.com/metro/26/FFFFFF/twitter.png', alt: 'Twitter', link: 'https://twitter.com' },
    { src: 'https://img.icons8.com/ios-glyphs/30/FFFFFF/facebook-new.png', alt: 'Facebook', link: 'https://facebook.com' },
    { src: 'https://img.icons8.com/ios-filled/50/FFFFFF/threads.png', alt: 'Threads', link: 'https://www.threads.net' },
    { src: 'https://img.icons8.com/ios-filled/50/FFFFFF/whatsapp--v1.png', alt: 'WhatsApp', link: 'https://www.whatsapp.com' },
    { src: 'https://img.icons8.com/forma-bold-filled/24/FFFFFF/tiktok.png', alt: 'TikTok', link: 'https://www.tiktok.com' },
    { src: 'https://img.icons8.com/ios-filled/50/FFFFFF/viber--v1.png', alt: 'Viber', link: 'https://www.viber.com' },
    { src: 'https://img.icons8.com/ios-filled/50/FFFFFF/youtube-play.png', alt: 'YouTube', link: 'https://www.youtube.com' },
    { src: 'https://img.icons8.com/ios-glyphs/30/FFFFFF/instagram-new.png', alt: 'Instagram', link: 'https://www.instagram.com' },
    { src: 'https://img.icons8.com/ios-filled/50/FFFFFF/telegram.png', alt: 'Telegram', link: 'https://telegram.org' },
  
  ];
}
