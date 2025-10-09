import { Component, OnInit } from '@angular/core';
import {    AlertController, ModalController } from '@ionic/angular';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
  standalone:false
})
export class PreguntasComponent  implements OnInit {
  id:any
 idtoken!: any
  autenticacion_tipo!:any
  location:any

site = {
 
    power: "",
    water: "",
    ensitio:""
   
  }
  ErrorMessage: any;


  constructor(
    private modalCtrl: ModalController,
     private localstorage:StorageService,
      private alertController: AlertController,
  ) { }

  ngOnInit() {}
validateForm(){ 

    var ValidationFlag = true


      
            
        if(this.site.power == '')  
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
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
    var url2 = 'https://washtt.com/v2_api_clientes_selectLocationList.php'
    var data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo,id:this.id}
    this.cHttps(url2, data2).subscribe(
      async (res: any) => {
        this.location =  res.data
        console.log( this.location)
      })
 
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  continue() {

 //alert(this.location.id + this.location.address)
  
   if(this.validateForm()){

  this.modalCtrl.dismiss({
    
      suite : this.location.suite,
       street : this.location.street_nr,
       address : this.location.address,
      zip : this.location.zip,
      state:this.location.state,
      city:this.location.city,
      power:this.site.power,
      water:this.site.water,
      presencia:this.site.ensitio
      
      },
       
       'continue');
    }
    else {

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
