import { Component, OnInit } from '@angular/core';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController  } from '@ionic/angular';
import { Router,  ActivatedRoute, Params } from '@angular/router';
import { LoadingService } from '../../servicios/loading.services';
@Component({
  selector: 'app-paso2-booking',
  templateUrl: './paso2-booking.component.html',
  styleUrls: ['./paso2-booking.component.scss'],
  standalone:false
})
export class Paso2BookingComponent  implements OnInit {

fleetVehiculo:any
modelVehiculo:any

  constructor(
     private localstorage:StorageService, 
    private alertController: AlertController,
     private router: Router,
      private loading: LoadingService,
         private rutaActiva: ActivatedRoute,
  ) {

  this.fleetVehiculo = this.rutaActiva.snapshot.params['fleetVehiculo'];
  this.modelVehiculo = this.rutaActiva.snapshot.params['modelVehiculo'];
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.fleetVehiculo = params['fleetVehiculo'];
          this.modelVehiculo = params['modelVehiculo'];
      }
    );


   }

  ngOnInit() {}

 async aviso(header : string, mensaje : string, code : string) {
    if (code == '') {
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


}
