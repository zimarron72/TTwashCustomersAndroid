import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import {  AlertController  } from '@ionic/angular';
import { StorageService } from '../../servicios/storage.service';
@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss'],
  standalone:false
})
export class CouponsComponent  implements OnInit {
user : any
idtoken : any
autenticacion_tipo : any
couponsUser : any
couponsForAll : any
  constructor(
    private localstorage:StorageService, 
            private alertController: AlertController,
             private router: Router,    
  ) { }

  ngOnInit() {}

  atras() {
     this.router.navigate(['/pasos/wellcome']);  
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


      async ionViewWillEnter() {   
 

  this.user = JSON.parse(await this.localstorage.getData('usuario'))
  this.idtoken = await this.localstorage.getData('idtoken')
  this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')


    let url1 = 'https://washtt.com/v2_api_clientes_get_coupons.php'
    let data1= { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}
    this.cHttps(url1, data1).subscribe(
      async (res: any) => {
     
        let mensaje
        let header
        let code
        switch(res.data.respuesta) {
         
          case 'ERROR':
            code = ''
            header = 'Error'
            mensaje = 'an error occurred,please login again'
            this.localstorage.clearData()
            this.router.navigate(['/login']);
            this.aviso(header, mensaje, code) 
            
           
          break;           

          default:

this.couponsUser = res.data.cuponesUser
this.couponsForAll = res.data.cuponesForAll
    


        }  
      })

}

doRefresh(event: { target: { complete: () => void; }; }) {
  event.target.complete();

let url1 = 'https://washtt.com/v2_api_clientes_get_coupons.php'
    let data1= { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}
    this.cHttps(url1, data1).subscribe(
      async (res: any) => {
     
        let mensaje
        let header
        let code
        switch(res.data.respuesta) {
         
          case 'ERROR':
            code = ''
            header = 'Error'
            mensaje = 'an error occurred,please login again'
            this.localstorage.clearData()
            this.router.navigate(['/login']);
            this.aviso(header, mensaje, code) 
            
           
          break;           

          default:

this.couponsUser = res.data.cuponesUser
this.couponsForAll = res.data.cuponesForAll
    


        }  
      })

}

tobook() {
  this.router.navigate(['pasos/paso1']);   
}







}
