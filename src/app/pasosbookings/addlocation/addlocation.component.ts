import { Component, OnInit } from '@angular/core';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController  } from '@ionic/angular';
import { Router} from '@angular/router';
import { LoadingService } from '../../servicios/loading.services';
@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.component.html',
  styleUrls: ['./addlocation.component.scss'],
  standalone:false
})
export class AddlocationComponent  implements OnInit {

user: any
  tipos!: any;
  detalles!:any
  idtoken!: any
  autenticacion_tipo!:any
  vehiculos:any
  modelos:any
  ErrorMessage = ''

site = {
    suite: "",
    street: "",
    address: "",
    zip : null,
    estado: "",
    ciudad: "",
    power: "",
    water: "",
    ensitio:""
   
  }

  estados:any
  cities:any

  constructor(
   private localstorage:StorageService, 
    private alertController: AlertController,
     private router: Router,
      private loading: LoadingService, 
  ) { }

  ngOnInit() {}


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

validateForm(){ 

    var ValidationFlag = true


       if(this.site.suite == "")  
    {
        this.ErrorMessage = "Indicate the apartment or house";
        ValidationFlag = false;
    } 
  
  
    else if(this.site.street == "")  
    {
        this.ErrorMessage = "Point to the street number";
        ValidationFlag = false;
    } 
  
    else if(this.site.address == "")  
        {
            this.ErrorMessage = "Please provide the address";
           ValidationFlag = false;
        }
  
    else if(this.site.zip == "")  
          {
              this.ErrorMessage = "Enter the code zip";
              ValidationFlag = false;
          }   
  
      else if(this.site.estado == "")  
          {
              this.ErrorMessage = "Indicate the State of your location";
              ValidationFlag = false;
          }
  
       else if(this.site.ciudad == '')  
            {
                this.ErrorMessage = "Indicate the City of your location";
                ValidationFlag = false;
            }  
            
          else if(this.site.power == '')  
            {
                this.ErrorMessage = "Please indicate the availability of electricity supply in your location.";
                ValidationFlag = false;
            }  
            
              else if(this.site.water == '')  
            {
                this.ErrorMessage = "Please indicate the availability of water supply in your location.";
                ValidationFlag = false;
            } 
            
              else if(this.site.ensitio == '')  
            {
                this.ErrorMessage = "Will be present on the day of service?";
                ValidationFlag = false;
            }   
  
 



   else { }
    return (ValidationFlag) ? true : false; 
    }

  async ionViewWillEnter() {

 this.user = JSON.parse(await this.localstorage.getData('usuario'))
  this.idtoken = await this.localstorage.getData('idtoken')
  this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo') 
  

       var url2 = 'https://washtt.com/v1_api_clientes_formestados.php'
    var data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
    this.cHttps(url2, data2).subscribe(
      async (res: any) => {
        this.estados =  res.data
        this.estados = Object.values(this.estados)
        this.estados =  this.estados.filter(((valor: string | any[]) => valor !== 'OK_DATA'))
        console.log(this.estados)
      })
      var url3 = 'https://washtt.com/v1_api_clientes_formciudades.php'
      var data3 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
      this.cHttps(url3, data3).subscribe(
        async (res: any) => {
          this.cities = res.data
          this.cities = Object.values(this.cities)
          this.cities =  this.cities.filter(((valor: string | any[]) => valor !== 'OK_DATA'))     
           console.log(this.cities)
        })   


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

  cancel() {
    this.router.navigate(['/pasos/locations']) 
  }

  confirm() {

  
    if(this.validateForm()){

       let url = 'https://washtt.com/v1_api_clientes_addsitio.php'
    let datax = { 
    idtoken: this.idtoken,
    autenticacion_tipo: this.autenticacion_tipo,
    email : this.user.email,
    suite : this.site.suite , 
    street : this.site.street,
    address : this.site.address,
state  : this.site.estado,
city : this.site.ciudad,
zip : this.site.zip,

  }
    this.cHttps(url, datax).subscribe(
      async (res: any) => {
        let code
        let header
        let mensaje
         switch(res.data.respuesta){ 
      case 'ERROR':
          code = ''
          header = 'Error'
          mensaje = 'Ups!,please login again'
          this.localstorage.clearData()
          this.router.navigate(['/login'])   
          this.aviso(header, mensaje, code) 
        break; 

       

        case 'OK_TODO':
 this.router.navigate(['/pasos/wellcome']) 
 code = ''
          header = ''
          mensaje = 'Location added successfully'
          this.aviso(header, mensaje, code) 
        break;  

        }
  })
    
  }  
  else {
    let code = ""
    let header = ""
    let mensaje = this.ErrorMessage
    this.aviso(header,mensaje,code)
  }   
   
    }

  powerPopoverOptions = {

    subHeader: 'Is there electricity on site?',

  };

    waterPopoverOptions = {

    subHeader: 'Is there a water supply on site?',

  };

    presenciaPopoverOptions = {

    subHeader: 'That day, will we to meet you?',

  };

    ciudadPopoverOptions = {

   // header: 'location's city',
    subHeader: "Location's city:",

  };

estadoPopoverOptions = {

   // header: 'Main location',
    subHeader: "Location's state:",

  };

  powers = [
  
  { etiqueta: 'YES' , valor: 'YES THERE ARE'},
  { etiqueta: 'NOT' , valor: 'THERE IS NOT'},
   ]
waters = [
  
    { etiqueta: 'YES' , valor: 'YES THERE ARE'},
    { etiqueta: 'NOT' , valor: 'THERE IS NOT'},
     ]
     
ensitios = [
   
      { etiqueta: 'YES' , valor: 'YES'},
      { etiqueta: 'NOT' , valor: 'NOT'},
       ]

}
