import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // Import provideRouter for routing
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslationService } from './app/components/services/translation.service';
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
  ]
}).catch(err => console.error(err));
