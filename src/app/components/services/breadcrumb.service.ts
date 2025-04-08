import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbSource = new BehaviorSubject<string[]>(['Home']);
  breadcrumb$ = this.breadcrumbSource.asObservable();

  setBreadcrumb(crumbs: string[]): void {
    this.breadcrumbSource.next(crumbs);
  }
}
