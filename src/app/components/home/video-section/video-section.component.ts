import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-section',
  imports: [CommonModule],
  templateUrl: './video-section.component.html',
  styleUrl: './video-section.component.scss'
})
export class VideoSectionComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  toggleVideo() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
}
