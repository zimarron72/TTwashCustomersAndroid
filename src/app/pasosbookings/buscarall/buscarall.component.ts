import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {formatDate} from '@angular/common';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController  } from '@ionic/angular';
@Component({
  selector: 'app-buscarall',
  templateUrl: './buscarall.component.html',
  styleUrls: ['./buscarall.component.scss'],
  standalone:false
})
export class BuscarallComponent  implements OnInit {

Vnumber:any
Onumber:any 
fecha:any 
user:any
idtoken:any
autenticacion_tipo:any
ErrorMessage:any

  constructor(
     private router: Router,
      private localstorage:StorageService, 
        private alertController: AlertController,
  ) { }

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


  /* validateForm(){ 

    var ValidationFlag = true


       if(this.Vnumber == "")  
    {
        this.ErrorMessage = "Select a time for your booking";
        ValidationFlag = false;
    } 
  
  
    else if(this.Onumber == "")  
    {
        this.ErrorMessage = "Select a date for your booking";
        ValidationFlag = false;
    }

     else if(this.fecha == "")  
    {
        this.ErrorMessage = "Select a date for your booking";
        ValidationFlag = false;
    } 

   else { }
    return (ValidationFlag) ? true : false; 
    }*/

  async continue() {
      this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
      var url2 = 'https://app.washtt.com/v2_api_clientes_buscar.php'
          var data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
          this.cHttps(url2, data2).subscribe(
            async (res: any) => {
              
           
              }
            )
}
    
}
