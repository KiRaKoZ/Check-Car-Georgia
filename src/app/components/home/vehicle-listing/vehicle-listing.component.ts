import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { CarService } from '../services/car-info.service';
import { CommonModule } from '@angular/common';
import { SliderService } from './slider.service';
import { CarInfoService } from '../../services/car-info.service';

@Component({
  selector: 'app-vehicle-listing',
  imports: [CommonModule],
  templateUrl: './vehicle-listing.component.html',
  styleUrl: './vehicle-listing.component.scss',
  providers: [CarService],
})
export class VehicleListingComponent implements OnInit, AfterViewInit {
  cars: any[] = [];
  currentIndex = 0;
  autoSlideInterval: any;
  startX = 0;
  screenWidth = window.innerWidth;
  isDragging = false;
  sliderContainer!: HTMLElement;
  backgroundColors: string[] = ['#735043', '#373948', '#405FF2']; // Add your colors
  randomBackgrounds: string[] = [];
  randomBackgroundColor: string = this.getRandomColor();



  constructor(
    private sliderService: CarService, 
    private el: ElementRef, 
    private renderer: Renderer2) {
    this.cars = this.sliderService.cars;
    this.generateRandomBackgrounds();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
  }
  
  generateRandomBackgrounds() {
    this.randomBackgrounds = this.cars.map(() => this.getRandomColor());
  }

  getRandomColor(): string {
    return this.backgroundColors[Math.floor(Math.random() * this.backgroundColors.length)];
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
    }, 1238000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.cars.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.cars.length) % this.cars.length;
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