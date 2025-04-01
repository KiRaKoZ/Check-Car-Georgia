import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-social-section',
  imports: [CommonModule],
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
    this.rotatingImages = this.generateRandomProperties();
    this.injectKeyframes();
  }

  generateRandomProperties() {
    const numImages = this.images.length;
    return this.images.map((image, index) => ({
      ...image, 
      size: [`40px`, `60px`, `80px`][Math.floor(Math.random() * 3)], // Random size
      orbitRadius: index % 3 === 0 ? 150 : 250, // Two different circle orbits
      speed: `${Math.floor( (20 - 5) + 5)}s`, // Random speed (5-10s)
      initialRotation: (360 / numImages) * index, // Staggered start position
      animationName: `orbit_${index}`, // Unique keyframe name
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