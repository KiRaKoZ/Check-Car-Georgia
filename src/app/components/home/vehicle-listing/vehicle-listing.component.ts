import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { CarService } from '../services/car-info.service';
import { CommonModule } from '@angular/common';
import { SliderService } from './slider.service';

@Component({
  selector: 'app-vehicle-listing',
  imports: [CommonModule],
  templateUrl: './vehicle-listing.component.html',
  styleUrl: './vehicle-listing.component.scss',
  providers: [CarService],
})
export class VehicleListingComponent implements OnInit, AfterViewInit {
  slides: any[] = [];
  currentIndex = 0;
  autoSlideInterval: any;
  startX = 0;
  isDragging = false;
  sliderContainer!: HTMLElement;

  constructor(private sliderService: SliderService, private el: ElementRef, private renderer: Renderer2) {
    this.slides = this.sliderService.slides;
  }

  ngOnInit() {
    this.startAutoSlide();
  }

  ngAfterViewInit() {
    this.sliderContainer = this.el.nativeElement.querySelector('.slider-container');
  }

  startAutoSlide() {
    // Clear any existing interval
    this.stopAutoSlide();

    // Set the interval for auto-slide (3 seconds)
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 6800);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  onDragStart(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.stopAutoSlide(); // Stop auto-slide during drag

    this.startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    event.preventDefault(); // Prevent text selection
  }

  onDragMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging || !this.sliderContainer) return;

    const currentX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const moveX = currentX - this.startX;

    this.renderer.setStyle(this.sliderContainer, 'transform', `translateX(${moveX}px)`); // Move the slider
  }

  onDragEnd(event: MouseEvent | TouchEvent) {
    if (!this.isDragging || !this.sliderContainer) return;

    this.isDragging = false;
    const endX = event instanceof MouseEvent ? event.clientX : event.changedTouches[0].clientX;
    
    // Determine if the user swiped left or right
    if (endX - this.startX > 50) {
      this.prevSlide();
    } else if (endX - this.startX < -50) {
      this.nextSlide();
    }

    // Reset the transform to keep the current slide in place
    this.renderer.setStyle(this.sliderContainer, 'transform', 'translateX(0)');

    // Restart auto-slide after drag
    this.startAutoSlide();
  }

  
}