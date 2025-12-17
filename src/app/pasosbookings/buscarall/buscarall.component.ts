import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {formatDate} from '@angular/common';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController  } from '@ionic/angular';
import { LoadingService } from '../../servicios/loading.services';
@Component({
  selector: 'app-buscarall',
  templateUrl: './buscarall.component.html',
  styleUrls: ['./buscarall.component.scss'],
  standalone:false
})
export class BuscarallComponent  implements OnInit {

Vnumber:any = ''
Onumber:any = ''
fecha:any = ''
user:any
idtoken:any
autenticacion_tipo:any
ErrorMessage:any

  constructor(
     private router: Router,
      private localstorage:StorageService, 
        private alertController: AlertController,
          private loading: LoadingService,
  ) {
    
   }

  async ngOnInit() {
    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
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


wellcome() {
   this.router.navigate(['/pasos/wellcome']);   
}

done2() {
  var code
  var header
  var mensaje
  var fecha = formatDate(this.fecha,'d MMM YYYY','en-US');
  //var hoy = formatDate(this.hoy,'d MMM YYYY','en-US');
 /*   code = ''
  header = "Selected day"
  mensaje = fecha+"  "+hoy
  this.aviso(header, mensaje, code)*/ 
/*if(fecha == hoy) {
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
}*/





}


 validateFormV(){ 

    var ValidationFlag = true


       if(this.Vnumber == "")  
    {
        this.ErrorMessage = "Enter the vehicle number to continue";
        ValidationFlag = false;
    } 
  
    return (ValidationFlag) ? true : false; 
    }
 validateFormO(){ 

    var ValidationFlag = true


       if(this.Onumber == "")  
    {
        this.ErrorMessage = "Enter the order number to continue";
        ValidationFlag = false;
    } 
  
    return (ValidationFlag) ? true : false; 
    }
validateFormCita(){ 

    var ValidationFlag = true


       if(this.fecha == "")  
    {
        this.ErrorMessage = "Select a date to continue";
        ValidationFlag = false;
    } 
  
    return (ValidationFlag) ? true : false; 
    }  

  async buscarV() {

    if(this.validateFormV()) {
      this.loading.simpleLoader
var url2 = 'https://app.washtt.com/v2_api_clientes_buscarV.php'
          var data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, numberV:this.Vnumber}
          this.cHttps(url2, data2).subscribe(
            async (res: any) => {
              
           
              }
            )
    } 
    else {
      this.loading.dismissLoader()
var code
  var header
  var mensaje
  code = ''
  header = ''
  mensaje = this.ErrorMessage
  this.aviso(header, mensaje, code) 
    } 
      
}

 async buscarO() {
     if(this.validateFormO()) {
      this.loading.simpleLoader  
      var url2 = 'https://app.washtt.com/v2_api_clientes_buscarO.php'
          var data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, numberO:this.Onumber}
          this.cHttps(url2, data2).subscribe(
            async (res: any) => {
              
           
              }
            )
  } 
    else {
      this.loading.dismissLoader()
var code
  var header
  var mensaje
  code = ''
  header = ''
  mensaje = this.ErrorMessage
  this.aviso(header, mensaje, code) 
    } 

}

 async buscarCita() {
     if(this.validateFormCita()) {
      this.loading.simpleLoader      
      var url2 = 'https://app.washtt.com/v2_api_clientes_buscarCita.php'
          var data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, fechaCita:this.fecha}
          this.cHttps(url2, data2).subscribe(
            async (res: any) => {
              
           
              }
            )
   } 
    else {
      this.loading.dismissLoader()
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
