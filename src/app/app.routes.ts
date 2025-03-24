import { Routes } from '@angular/router';
import { ContactComponent } from './components/pages/Contact/contact.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'Contact', component:  ContactComponent},
];
    