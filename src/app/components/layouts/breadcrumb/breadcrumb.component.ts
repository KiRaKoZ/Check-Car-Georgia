import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  imports: [CommonModule, RouterLink]
})
export class BreadcrumbComponent implements OnInit {
  breadcrumb: string[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService
  ) {}


  ngOnInit(): void {
    // Subscribe to breadcrumb updates
    this.breadcrumbService.breadcrumb$.subscribe(breadcrumb => {
      this.breadcrumb = breadcrumb;
    });
  }

  updateBreadcrumb(url: string) {
    const parts = url
      .split('/')
      .filter(p => p)
      .map(p => p.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())); // nice formatting
    this.breadcrumb = ['Home', ...parts];
  }

  getLink(index: number): string {
    const path = this.breadcrumb.slice(1, index + 1).join('/').toLowerCase().replace(/ /g, '-');
    return '/' + path;
  }
}
