import { Component, OnInit } from '@angular/core';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController  } from '@ionic/angular';
import { Router  } from '@angular/router';
@Component({
  selector: 'app-couponyesnot',
  templateUrl: './couponyesnot.component.html',
  styleUrls: ['./couponyesnot.component.scss'],
  standalone:false
})
export class CouponyesnotComponent  implements OnInit {

  constructor(
     private localstorage:StorageService, 
        private alertController: AlertController,
         private router: Router,
  ) { }

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

   async ionViewWillEnter() {

    }

   async doRefresh(event: { target: { complete: () => void; }; }) {
 event.target.complete();
     } 

     async atras() {
   this.router.navigate(['/pasos/paso1']);
   await this.localstorage.removeData('itemcartVehiculo1')
     await this.localstorage.removeData('itemcartServicio')
       await this.localstorage.removeData('itemcartOnsite')
         await this.localstorage.removeData('itemcartMobil')
           await this.localstorage.removeData('itemcartTime')
   
}    

yesCoupon(){}

notCoupon(){}





}



