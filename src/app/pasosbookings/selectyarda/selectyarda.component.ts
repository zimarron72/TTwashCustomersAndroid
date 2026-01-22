import { Component,  OnInit,  } from '@angular/core';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController  } from '@ionic/angular';
import { Router  } from '@angular/router';
import { LoadingService } from '../../servicios/loading.services';

@Component({
  selector: 'app-selectyarda',
  templateUrl: './selectyarda.component.html',
  styleUrls: ['./selectyarda.component.scss'],
  standalone:false
})
export class SelectyardaComponent  implements OnInit {


sitiosyard: any
user: any
idtoken! : string
autenticacion_tipo! : string
token_notificacion! : string




  constructor(
     private localstorage:StorageService, 
    private alertController: AlertController,
     private router: Router,
      private loading: LoadingService,
      

  ) {

     

   }



  ngOnInit() {}

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

  async ionViewWillEnter() {
        this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
      var url2 = 'https://washtt.com/v1_api_clientes_sitiosyard.php'
          var data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
          this.cHttps(url2, data2).subscribe(
            async (res: any) => {
              this.sitiosyard = res.data
              this.sitiosyard = Object.values(this.sitiosyard)
              this.sitiosyard =  this.sitiosyard.filter(((valor: string | any[]) => valor !== 'OK_DATA'))     
               console.log("XXXXXXXXXXX"+this.sitiosyard)
              }
            )
          }

    async doRefresh(event: { target: { complete: () => void; }; }) {
 event.target.complete();
 this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
          var url2 = 'https://washtt.com/v1_api_clientes_sitiosyard.php'
          var data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
          this.cHttps(url2, data2).subscribe(
            async (res: any) => {
              this.sitiosyard = res.data
              this.sitiosyard = Object.values(this.sitiosyard)
              this.sitiosyard =  this.sitiosyard.filter(((valor: string | any[]) => valor !== 'OK_DATA'))     
               console.log(this.sitiosyard)
              }
            )
  
  }



  async atras() {
   await this.localstorage.removeData('itemcartVehiculo1')
     await this.localstorage.removeData('itemcartServicio')
       var id_category =  await this.localstorage.getData('id_category')
   this.router.navigate(['/pasos/paso2', id_category ]);
  
   
}

  async createMap(lat : any , lng : any, address : any, nombre : any, yard_id:any) {

const direccion = nombre + " : " + address

  this.router.navigate(['pasos/map',lat,lng,direccion,yard_id])
    }

 async selectCita(yard_nombre:any, address:any) {
  

  let itemcartOnsite = {
   
       donde : 1, //onsite
      sitioid : 0,
      yard_nombre : yard_nombre,
      address : address
    }

    let itemcartMobil = {
   
       donde : 'nada'
  
    } 

 await this.localstorage.setObject('itemcartOnsite', itemcartOnsite)
  await this.localstorage.setObject('itemcartMobil', itemcartMobil)
this.router.navigate(['/pasos/selectcita']);  
 }   





        }
