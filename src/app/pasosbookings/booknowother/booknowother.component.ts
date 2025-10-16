import { Component, OnInit } from '@angular/core';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController  } from '@ionic/angular';
import { Router} from '@angular/router';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-booknowother',
  templateUrl: './booknowother.component.html',
  styleUrls: ['./booknowother.component.scss'],
  standalone:false
})
export class BooknowotherComponent  implements OnInit {

 book = {
    tipoV: "", 
    tipoS: ""  , 
    unitnumber: '',
    diaCita: "",
    horaCita: "",
    model: "",
    brand: "",
    license: "",
    color:  "",
    detallev: ""

  }
user: any
idtoken!: any
autenticacion_tipo!:any
vehiculos:any
services:any
horario:any
hoy:any
ErrorMessage = ''
detalles: any



  constructor(
      private localstorage:StorageService, 
        private alertController: AlertController,
         private router: Router,
      
  ) { 
     this.hoy = new Date().toISOString()
  }

  ngOnInit() {}

  wellcome() {
   this.router.navigate(['/pasos/wellcome']);   
}

 validateForm(){ 

    var ValidationFlag = true


       if(this.book.tipoV == "")  
    {
        this.ErrorMessage = "Describe the type of vehicles to be cleaned";
        ValidationFlag = false;
    } 

      else if(this.book.model == "")  
        {
            this.ErrorMessage = "Describe the model of vehicles";
           ValidationFlag = false;
        }

         else if(this.book.brand == "")  
        {
            this.ErrorMessage = "Indicate the brand of the vehicle";
           ValidationFlag = false;
        }

         else if(this.book.brand == "")  
        {
            this.ErrorMessage = "Indicate the color of the vehicle";
           ValidationFlag = false;
        }

      else if(this.book.unitnumber == "")  
        {
            this.ErrorMessage = "What is the vehicle identification number?";
           ValidationFlag = false;
        }

        else if(this.book.license == "")  
        {
            this.ErrorMessage = "Complete the license field to continue";
           ValidationFlag = false;
        }

        else if(this.book.detallev == "")  
                {
                    this.ErrorMessage = "What does your vehicle look like?";
                    ValidationFlag = false;
                } 
  
    else if(this.book.tipoS == "")  
    {
        this.ErrorMessage = "Indicate the cleaning service requested";
        ValidationFlag = false;
    } 
  
   else if(this.book.horaCita == "")  
    {
        this.ErrorMessage = "Select a time for your booking";
        ValidationFlag = false;
    } 
  
  
    else if(this.book.diaCita == "")  
    {
        this.ErrorMessage = "Select a date for your booking";
        ValidationFlag = false;
    } 

   else { }
    return (ValidationFlag) ? true : false; 
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

    var url = 'https://app.washtt.com/v2_api_clientes_poblar_formNowFleet.php'
    var data = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email }
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
            this.vehiculos = res.data.vehiculos
            this.services = res.data.servicios
            this.horario = res.data.horario 
            
        }
                      
      }
    )
    
  }

  async doRefresh(event: { target: { complete: () => void; }; }) {
  event.target.complete();

 this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')

    var url = 'https://washtt.com/v2_api_clientes_poblar_formNowFleet.php'
    var data = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email }
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
            this.vehiculos = res.data  
            
        }
                      
      }
    )

}

tipoVehiclePopoverOptions = {

   // header: 'General details of the vehicle',
    subHeader: 'Select one from the set of vehicles:',

  };

 detallesPopoverOptions = {

   // header: 'General details of the vehicle',
    subHeader: 'We count on your sincere selection:',

  };  

tipoServicePopoverOptions = {
  
  subHeader: "Select a type's Service or Wash",
}

timePopoverOptions = {

   subHeader: 'Work schedule: select the time of your preference',

  };

done2() {
  var code
  var header
  var mensaje
  var fecha = formatDate(this.book.diaCita,'d MMM YYYY','en-US');
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
  var hora = this.book.horaCita
  code = ''
  header = 'Selected appointment time'
  mensaje = hora
  this.aviso(header, mensaje, code) 

}

  async continue() {

    if(this.validateForm()) {

   this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')

    var url = 'https://app.washtt.com/v2_api_clientes_checkout_formNowOther.php'
    var data = { 
      idtoken: this.idtoken,
      autenticacion_tipo: this.autenticacion_tipo,
      email: this.user.email,
    tipoV : this.book.tipoV,
    tipoS: this.book.tipoS,
    numberV: this.book.unitnumber,
   horaCita:  this.book.horaCita,            
    diaCita: formatDate(this.book.diaCita,'mm-dd-yyyy','en-US'),
    modelV : this.book.model,
    brandV : this.book.brand,
    colorV : this.book.color,
    licenseV : this.book.license,
    detalleV : this.book.detallev

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
