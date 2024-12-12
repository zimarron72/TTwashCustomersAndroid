import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';


import { AutenticacionService } from './servicios/autenticacion';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';


import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

//import { WonderPush } from '@awesome-cordova-plugins/wonderpush/ngx';


import {  ReactiveFormsModule } from '@angular/forms';


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
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  provideStorage(() => getStorage()),
  AutenticacionService,
  LoadingController,
  Storage,
  //WonderPush

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
