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
user:any
idtoken:any
autenticacion_tipo: any
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

ngOnInit() {}



 async notCoupon() {
  this.user = JSON.parse(await this.localstorage.getData('usuario'))
      this.idtoken = await this.localstorage.getData('idtoken')
      this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
  
      var url = 'https://app.washtt.com/v2_api_clientes_checkout_formNowOther.php'
      var data = { 
        idtoken: this.idtoken,
        autenticacion_tipo: this.autenticacion_tipo,
        email: this.user.email,
      
  
      }
      this.cHttps(url, data).subscribe(
        async (res: any) => {
          console.log(res)
          let mensaje
          let header
          let code
          switch (res.data.respuesta) {
            case 'ERROR':
              code = '01'
              header = 'Error'
              mensaje = 'an error occurred,please login again'
              this.localstorage.clearData()
              this.router.navigate(['/login'])       
              this.aviso(header, mensaje, code)              
              break;         
          
            default:
              this.router.navigate(['/tabs/tabtobooks/successtobook']);
              
          }
                        
        }
      )
 }

yesCoupon() {}


     async doRefresh(event: { target: { complete: () => void; }; }) {
 event.target.complete();
     }


      async atras() {
   this.router.navigate(['/pasos/selectcita']);
   await this.localstorage.removeData('itemcartVehiculo1')
     await this.localstorage.removeData('itemcartServicio')
       await this.localstorage.removeData('itemcartOnsite')
         await this.localstorage.removeData('itemcartMobil')
           await this.localstorage.removeData('itemcartTime')
   
}   

}
