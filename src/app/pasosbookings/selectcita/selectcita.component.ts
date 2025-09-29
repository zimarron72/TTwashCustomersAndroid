import { Component, OnInit } from '@angular/core';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController  } from '@ionic/angular';
import { Router  } from '@angular/router';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-selectcita',
  templateUrl: './selectcita.component.html',
  styleUrls: ['./selectcita.component.scss'],
  standalone:false
})
export class SelectcitaComponent  implements OnInit {

user: any
idtoken! : string
autenticacion_tipo! : string
token_notificacion! : string
horario:any

mobil = {

  diacita: "",
 horacita : "",

}


hoy: any
currentDate: any

  constructor(

       private localstorage:StorageService, 
        private alertController: AlertController,
         private router: Router,
    
  ) { }

  ngOnInit() {}

    async atras() {
   this.router.navigate(['/pasos/paso1']);
   await this.localstorage.removeData('itemcart')
   
}

timePopoverOptions = {

   subHeader: 'Work schedule: select the time of your preference',

  };

done2() {
  var code
  var header
  var mensaje
  var fecha = formatDate(this.mobil.diacita,'d MMM YYYY','en-US');
  code = ''
  header = 'Selected appointment date'
  mensaje = fecha
  this.aviso(header, mensaje, code) 

}

done1() {
  var code
  var header
  var mensaje
  var hora = this.mobil.horacita
  code = ''
  header = 'Selected appointment time'
  mensaje = hora
  this.aviso(header, mensaje, code) 

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
      var url2 = 'https://app.washtt.com/v2_api_clientes_horario.php'
          var data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
          this.cHttps(url2, data2).subscribe(
            async (res: any) => {
              this.horario= res.data
           
              }
            )
          }

    async doRefresh(event: { target: { complete: () => void; }; }) {
 event.target.complete();
         this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
      var url2 = 'https://app.washtt.com/v2_api_clientes_horario.php'
          var data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
          this.cHttps(url2, data2).subscribe(
            async (res: any) => {
              this.horario= res.data
           
              }
            )
  
  }



}
