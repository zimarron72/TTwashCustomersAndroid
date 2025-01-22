import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { LoadingService } from '../servicios/loading.services';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
  })
  export class ServiciosTobook {

    constructor(
   
      private router: Router,
      private alertController: AlertController,
      private localstorage: StorageService,
      private loading: LoadingService,

    ) { }

    cHttps(url: string, data: any) {
      const options: HttpOptions = {
        url,
        headers: {
          // 'Authorization': 'Token asdf',
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        data
      }
      return from(CapacitorHttp.post(options))
    }
  
    async aviso(header : string,mensaje : string, code : string) {
  if(code == '') {
    const alert = await this.alertController.create({
      header,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();  
  }
  else {
    const alert = await this.alertController.create({
      header,
      message: code + ' Sorry, ' + mensaje,
      buttons: ['OK'],
    });
    await alert.present();  
  }
  }

 
    
  }