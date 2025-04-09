import { Routes } from '@angular/router';
import { ContactComponent } from './components/pages/Contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { ServicePageComponent } from './components/pages/service-page/service-page.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { FAQComponent } from './components/home/faq/faq.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { CalculatorComponent } from './components/pages/calculator/calculator.component';
import { GalleryComponent } from './components/pages/gallery/gallery.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contact', component:  ContactComponent},
    { path: 'service-page', component:  ServicePageComponent},
    { path: 'terms&conditions', component:  TermsConditionsComponent},
    { path: 'gallery', component:  GalleryComponent},
    { path: 'faq', component:  FAQComponent},
    { path: 'about us', component:  AboutUsComponent},
    { path: 'calculator', component:  CalculatorComponent},
    { path: '**', component: NotFoundComponent }
];
    