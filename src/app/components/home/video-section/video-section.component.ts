import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, Signal, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-video-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-section.component.html',
  styleUrl: './video-section.component.scss',
})
export class VideoSectionComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  private translationService = inject(TranslationService);
  translations: Signal<any> = this.translationService.translations;
  ngAfterViewInit(): void {
    this.startVideo();
  }

  startVideo() {
    const video = this.videoPlayer.nativeElement;

    video.muted = true;
    video.loop = true;

    video.play().catch(() => {
      // fallback თუ autoplay დაბლოკა ბრაუზერმა
      video.muted = true;
      video.play();
    });
  }

  toggleVideo() {
    const video = this.videoPlayer.nativeElement;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
}
