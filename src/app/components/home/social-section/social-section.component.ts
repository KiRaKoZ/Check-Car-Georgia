import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-social-section',
  imports: [CommonModule, RouterLink],
  templateUrl: './social-section.component.html',
  styleUrl: './social-section.component.scss'
})
export class SocialSectionComponent {
 images = [
  { src: 'icons/twitter-x.svg', alt: 'Twitter', link: 'https://twitter.com' },
  { src: 'icons/facebook.svg', alt: 'Facebook', link: 'https://facebook.com' },
  { src: 'icons/threads.svg', alt: 'Threads', link: 'https://www.threads.net' },
  { src: 'icons/tiktok.svg', alt: 'TikTok', link: 'https://www.tiktok.com' },
  { src: 'icons/viber.svg', alt: 'Viber', link: 'https://www.viber.com' },
  { src: 'icons/whatsapp.svg', alt: 'WhatsApp', link: 'https://www.whatsapp.com' },
  { src: 'icons/youtube.svg', alt: 'YouTube', link: 'https://www.youtube.com' },
  { src: 'icons/instagram.svg', alt: 'Instagram', link: 'https://www.instagram.com' },
  { src: 'icons/telegram.svg', alt: 'Telegram', link: 'https://telegram.org' },

];
  
  rotatingImages: any[] = [];

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.updateOrbitProperties();
    this.injectKeyframes();
    window.addEventListener('resize', () => {
      this.updateOrbitProperties();
    });
  }

  updateOrbitProperties() {
    this.rotatingImages = this.generateRandomProperties();
  }
  generateRandomProperties() {
    const isMobile = window.innerWidth < 768; // Detect mobile view
    return this.images.map((image, index) => ({
      ...image, 
      size: isMobile ? [`30px`, `50px`][Math.floor(Math.random() * 2)] : [`40px`, `50px`, `70px`][Math.floor(Math.random() * 3)], // Smaller size on mobile
      orbitRadius: isMobile ? (index % 2 === 0 ? 150 : 150) : (index % 2 === 0 ? 150 : 150), // Smaller orbits on mobile
      speed: `${Math.floor( (40 - 5) + 5)}s`,
      initialRotation: (360 / this.images.length) * index,
      animationName: `orbit_${index}`,
      isPaused: false
    }));
  }

  injectKeyframes() {
    const styleSheet = this.renderer.createElement('style');
    let keyframes = '';

    this.rotatingImages.forEach((image, index) => {
      keyframes += `
        @keyframes orbit_${index} {
          0% { transform: rotate(${image.initialRotation}deg) translate(${image.orbitRadius}px) rotate(-${image.initialRotation}deg); }
          100% { transform: rotate(${image.initialRotation + 360}deg) translate(${image.orbitRadius}px) rotate(-${image.initialRotation + 360}deg); }
        }
      `;
    });

    this.renderer.appendChild(styleSheet, this.renderer.createText(keyframes));
    document.head.appendChild(styleSheet);
  }

  stopAnimation(event: MouseEvent) {
    const target = event.target as HTMLElement;
    this.renderer.setStyle(target, 'animation-play-state', 'paused');
  }

  startAnimation(event: MouseEvent) {
    const target = event.target as HTMLElement;
    this.renderer.setStyle(target, 'animation-play-state', 'running');
  }
}