import { CommonModule } from '@angular/common';
import { Component, Renderer2, Signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-social-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './social-section.component.html',
  styleUrl: './social-section.component.scss'
})
export class SocialSectionComponent {
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;
  images = [
    { src: 'icons/facebook.svg', alt: 'Facebook', link: 'https://www.facebook.com/checkcar.georgia.2025/' },
    { src: 'icons/threads.svg', alt: 'Threads', link: 'http://threads.com/@check_car_georgia' },
    { src: 'icons/tiktok.svg', alt: 'TikTok', link: 'https://www.tiktok.com/@checkcargeorgia' },
    { src: 'icons/viber.svg', alt: 'Viber', link: 'viber://chat?number=%2B995571525055' },
    { src: 'icons/whatsapp.svg', alt: 'WhatsApp', link: 'https://wa.me/995571525055' },
    { src: 'icons/youtube.svg', alt: 'YouTube', link: 'https://www.youtube.com/@CheckCarGeorgia' },
    { src: 'icons/telegram.svg', alt: 'Telegram', link: 'https://t.me/+F5In7dVI8g5hMmYy' }
  ];
  rotatingImages: any[] = [];
  constructor(private renderer: Renderer2) {}
  ngOnInit() { this.updateOrbitProperties(); this.injectKeyframes(); window.addEventListener('resize', () => this.updateOrbitProperties()); }
  updateOrbitProperties() { this.rotatingImages = this.generateRandomProperties(); }
  generateRandomProperties() { const isMobile = window.innerWidth < 768; return this.images.map((image, index) => ({ ...image, size: isMobile ? ['30px', '50px'][Math.floor(Math.random()*2)] : ['40px','50px','70px'][Math.floor(Math.random()*3)], orbitRadius: 150, speed: `${Math.floor((40 - 5) + 5)}s`, initialRotation: (360 / this.images.length) * index, animationName: `orbit_${index}`, isPaused: false })); }
  injectKeyframes() { const styleSheet = this.renderer.createElement('style'); let keyframes = ''; this.rotatingImages.forEach((image, index) => { keyframes += `@keyframes orbit_${index}{0%{transform:rotate(${image.initialRotation}deg) translate(${image.orbitRadius}px) rotate(-${image.initialRotation}deg);}100%{transform:rotate(${image.initialRotation + 360}deg) translate(${image.orbitRadius}px) rotate(-${image.initialRotation + 360}deg);}}`; }); this.renderer.appendChild(styleSheet, this.renderer.createText(keyframes)); document.head.appendChild(styleSheet); }
  isTouchDevice(): boolean { return 'ontouchstart' in window || navigator.maxTouchPoints > 0; }
  stopAnimation(event: MouseEvent) { if (this.isTouchDevice()) return; this.renderer.setStyle(event.target as HTMLElement, 'animation-play-state', 'paused'); }
  startAnimation(event: MouseEvent) { if (this.isTouchDevice()) return; this.renderer.setStyle(event.target as HTMLElement, 'animation-play-state', 'running'); }
}
