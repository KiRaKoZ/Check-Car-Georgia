import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/pages/Contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
  },
  {
    path: 'booking-page',
    loadComponent: () =>
      import('./components/pages/service-page/service-page.component').then(
        (m) => m.ServicePageComponent,
      ),
  },
  { path: 'service-page', redirectTo: 'booking-page', pathMatch: 'full' },
  {
    path: 'terms-and-conditions',
    loadComponent: () =>
      import('./components/pages/terms-conditions/terms-conditions.component').then(
        (m) => m.TermsConditionsComponent,
      ),
  },
  {
    path: 'terms&conditions',
    redirectTo: 'terms-and-conditions',
    pathMatch: 'full',
  },
  {
    path: 'cars',
    loadComponent: () =>
      import('./components/pages/cars/cars.component').then(
        (m) => m.CarsPageComponent,
      ),
  },
  {
    path: 'cars/:slug',
    loadComponent: () =>
      import('./components/pages/car-detail/car-detail.component').then(
        (m) => m.CarDetailComponent,
      ),
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./components/home/faq/faq.component').then((m) => m.FAQComponent),
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./components/pages/about-us/about-us.component').then(
        (m) => m.AboutUsComponent,
      ),
  },
  {
    path: 'calculator',
    loadComponent: () =>
      import('./components/home/loan-calculator/loan-calculator.component').then(
        (m) => m.LoanCalculatorComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
