import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from "./environments/environment";
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { addIcons } from 'ionicons';
import { addCircle, search,close } from 'ionicons/icons';
import { provideAuth, getAuth } from '@angular/fire/auth';
const app = initializeApp(environment.firebase);
addIcons({
  'add-circle': addCircle,
  'search': search,
  'close': close,
});
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => app),  // ✅ Proveer Firebase
    provideFirestore(() => getFirestore()), // ✅ Proveer Firestore
    provideAuth(() => getAuth()) 
  ],
});
