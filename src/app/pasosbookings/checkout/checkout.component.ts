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
onsite:any
mobil:any
locationmobil:any
locationonsite:any
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

this.onsite = onsiteData.donde
this.mobil = mobilData.donde

if(this.onsite == 'nada') {
  this.locationmobil = 'AT YOUR ADDRESS: '+mobilData.address+" "+mobilData.city+" "+mobilData.zip
}
if(this.mobil == 'nada') {
  this.locationonsite = 'AT OUR LOCATION: '+mobilData.address+" "+mobilData.city+" "+mobilData.zip
}

this.time = timeData.diacita+" "+timeData.horacita


}


  ngOnInit() {}

  continuar(){
     this.router.navigate(['/pasos/couponyesnot']);
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

}
