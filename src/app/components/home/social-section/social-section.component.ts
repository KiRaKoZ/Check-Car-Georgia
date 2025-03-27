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
    { src: 'icons/twitter-x.svg', alt: 'Image 1' },
    { src: 'icons/facebook.svg', alt: 'Image 2' },
    { src: 'icons/telegram.svg', alt: 'Image 3' },
    { src: 'icons/threads.svg', alt: 'Image 4' },
    { src: 'icons/tiktok.svg', alt: 'Image 5' },
    { src: 'icons/viber.svg', alt: 'Image 6' },
    { src: 'icons/whatsapp.svg', alt: 'Image 7' },
    { src: 'icons/youtube.svg', alt: 'Image 8' },
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