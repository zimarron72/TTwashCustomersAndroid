import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';

//services**************
import { AutenticacionService } from './servicios/autenticacion';
import { ServiciosTobook} from './servicios/servicios.tobook';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { SquareService } from './servicios/square.service';


import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideAuth, getAuth, indexedDBLocalPersistence, initializeAuth } from '@angular/fire/auth';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideStorage, getStorage } from '@angular/fire/storage';

//import { WonderPush } from '@awesome-cordova-plugins/wonderpush/ngx';


import {  ReactiveFormsModule } from '@angular/forms';
import { Capacitor } from '@capacitor/core';



@NgModule({
  declarations: [AppComponent],

  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,   
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js',
      {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
      })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideAuth(() => {
    if (Capacitor.isNativePlatform()) {
      return initializeAuth(getApp(), {
        persistence: indexedDBLocalPersistence
      });
    } else {
      return getAuth()
    }
  }), 
  provideStorage(() => getStorage()),
  provideMessaging(() => getMessaging()),
  

  AutenticacionService,
  ServiciosTobook,
  LoadingController,
  Storage,
  SquareService,
  //WonderPush

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
