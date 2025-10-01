import { Component, OnInit } from '@angular/core';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController  } from '@ionic/angular';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone:false
})
export class CheckoutComponent  implements OnInit {
vehiculo:any
servicio:any
tipo:any
precio:any
time:any
  constructor(
     private localstorage:StorageService, 
        private alertController: AlertController,
         private router: Router,
  ) { 



  }

  async ionViewWillEnter() {
    let vehiculoData = JSON.parse(await this.localstorage.getData('itemcartVehiculo1'))
    let servicioData = JSON.parse(await this.localstorage.getData('itemcartServicio'))
    let onsiteData = JSON.parse(await this.localstorage.getData('itemcartOnsite'))
     let mobilData = JSON.parse(await this.localstorage.getData('itemcartMobil'))
      let timeData = JSON.parse(await this.localstorage.getData('itemcartTime'))

this.vehiculo = vehiculoData.camiont +" "+ vehiculoData.camionmdl +" NUMBER: "+ vehiculoData.camionn

this.servicio = servicioData.servicio

this.precio = servicioData.precio

if(mobilData) {
this.tipo = "MOBIL"
}
if(onsiteData) {
this.tipo = "ONSITE"
}

this.time = timeData.diacita+" "+timeData.horacita


}


  ngOnInit() {}

  bookNow(){}

bookOther(){}


     async doRefresh(event: { target: { complete: () => void; }; }) {
 event.target.complete();
     }


      async atras() {
   this.router.navigate(['/pasos/paso1']);
   await this.localstorage.removeData('itemcart')
   
}   

}
