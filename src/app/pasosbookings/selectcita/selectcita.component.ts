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

ErrorMessage:any

hoy: any
currentDate: any

  constructor(

       private localstorage:StorageService, 
        private alertController: AlertController,
         private router: Router,
    
  ) {
     this.hoy = new Date().toISOString()
   }

  ngOnInit() {}

    async atras() {
 
   await this.localstorage.removeData('itemcartVehiculo1')
     await this.localstorage.removeData('itemcartServicio')
       await this.localstorage.removeData('itemcartOnsite')
         await this.localstorage.removeData('itemcartMobil')
           var id_category =  await this.localstorage.getData('id_category')
   this.router.navigate(['/pasos/paso2', id_category ]);
  
   
}

timePopoverOptions = {

   subHeader: 'Work schedule: select the time of your preference',

  };

done2() {
  var code
  var header
  var mensaje
  var fecha = formatDate(this.mobil.diacita,'d MMM YYYY','en-US');
  var hoy = formatDate(this.hoy,'d MMM YYYY','en-US');
 /*   code = ''
  header = "Selected day"
  mensaje = fecha+"  "+hoy
  this.aviso(header, mensaje, code)*/ 
if(fecha == hoy) {
  code = ''
  header = 'AVISO IMPORTANTE'
  mensaje = "The selected date is today: "+fecha+". If you proceed with this selection, we recommend that you contact us at +1 (407) 569-9122 after completing this application."
  this.aviso(header, mensaje, code) 
}
else {
  code = ''
  header = "Selected day"
  mensaje = fecha
    this.aviso(header, mensaje, code) 
}





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

   validateForm(){ 

    var ValidationFlag = true


       if(this.mobil.horacita == "")  
    {
        this.ErrorMessage = "Select a time for your booking";
        ValidationFlag = false;
    } 
  
  
    else if(this.mobil.diacita == "")  
    {
        this.ErrorMessage = "Select a date for your booking";
        ValidationFlag = false;
    } 

   else { }
    return (ValidationFlag) ? true : false; 
    }

  async continue() {
if(this.validateForm()) {


let itemcartTime = {
 
      diacita : formatDate(this.mobil.diacita,'mm-dd-yyyy','en-US'),
      horacita : this.mobil.horacita,
      
    }

 await this.localstorage.setObject('itemcartTime', itemcartTime)
this.router.navigate(['/pasos/checkout']);  
}
else {
var code
  var header
  var mensaje
  code = ''
  header = ''
  mensaje = this.ErrorMessage
  this.aviso(header, mensaje, code) 
}
}

}
