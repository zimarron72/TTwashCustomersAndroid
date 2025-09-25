import { Component, OnInit } from '@angular/core';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController  } from '@ionic/angular';
import { Router,  ActivatedRoute, Params } from '@angular/router';
import { LoadingService } from '../../servicios/loading.services';

@Component({
  selector: 'app-paso3',
  templateUrl: './paso3.component.html',
  styleUrls: ['./paso3.component.scss'],
  standalone:false
})



export class Paso3Component  implements OnInit {

id:any

  constructor(
        private localstorage:StorageService, 
    private alertController: AlertController,
     private router: Router,
      private loading: LoadingService,
         private rutaActiva: ActivatedRoute,
  ) { 

 this.id = this.rutaActiva.snapshot.params['id'];
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.id = params['id'];        
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

  

  async atras() {
   this.router.navigate(['/pasos/paso1']);
   await this.localstorage.removeData('itemcart')
   
}

}
