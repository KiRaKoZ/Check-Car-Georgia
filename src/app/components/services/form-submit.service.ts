import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FormSubmitService {
  private http = inject(HttpClient);

  private getApiBaseUrl(): string {
    if (typeof window === 'undefined') return '';
    const { hostname, port, origin, protocol } = window.location;
    if ((hostname === 'localhost' || hostname === '127.0.0.1') && port === '4200') return 'http://localhost:4100';
    if (hostname === 'admin.checkcargeorgia.ge') return origin;
    if (hostname === 'checkcargeorgia.ge' || hostname.endsWith('.checkcargeorgia.ge')) return `${protocol}//admin.checkcargeorgia.ge`;
    return origin;
  }

  submitContact(payload: any) { return this.http.post(`${this.getApiBaseUrl()}/api/contact`, payload); }
  submitBooking(payload: any) { return this.http.post(`${this.getApiBaseUrl()}/api/booking`, payload); }
  subscribe(payload: any) { return this.http.post(`${this.getApiBaseUrl()}/api/subscribe`, payload); }
}
