import { Component, OnInit } from '@angular/core';
import {    ModalController } from '@ionic/angular';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
@Component({
  selector: 'app-addsite',
  templateUrl: './addsite.component.html',
  styleUrls: ['./addsite.component.scss'],
  standalone:false
})
export class AddsiteComponent  implements OnInit {

 
  
  estados!:any
  idtoken!: any
  autenticacion_tipo!:any
  cities!:any
 

  allErrorMessage = ''
  suiteErrorMessage = ''
  streetErrorMessage = ''
  addressErrorMessage = ''
  estadoErrorMessage = ''
  ciudadErrorMessage = ''
  zipErrorMessage = ''
  favoritoErrorMessage = ''

  site = {
    suite: "",
    street: "",
    address: "",
    zip : null,
    estado: "",
    ciudad: "",
    favorito: ""
  }



  constructor(
    private localstorage:StorageService,
    private modalCtrl: ModalController,
  ) { }

  validateForm(){

  

    var allValidationFlag = true
    var suiteValidationFlag = true
    var streetValidationFlag = true
    var addressValidationFlag = true
    var zipValidationFlag = true
    var estadoValidationFlag = true
    var ciudadValidationFlag = true
    var favoritoValidationFlag = true
    
  
    if (this.site.suite == "" && this.site.street == "" && this.site.zip == null && this.site.estado == "" && this.site.ciudad == "" && this.site.favorito == "" && this.site.address == "" ) {
        this.allErrorMessage = "All camps must be filled out";
        allValidationFlag = false ; 
    }
  
    if (this.site.suite == "" && allValidationFlag == true) {
      this.suiteErrorMessage = "Your suite must be filled out";
      suiteValidationFlag = false ; 
  }
  
    if(this.site.street == "" && allValidationFlag == true)  
    {
        this.streetErrorMessage = "Your street must be filled out";
        streetValidationFlag = false;
    } 
  
    if(this.site.address == "" && allValidationFlag == true)  
        {
            this.addressErrorMessage = "Your address must be filled out";
            addressValidationFlag = false;
        }
  
    if(this.site.zip == null && allValidationFlag == true)  
          {
              this.zipErrorMessage = "The code postal must be filled out or a number";
              zipValidationFlag = false;
          }   
  
      if(this.site.estado == "" && allValidationFlag == true)  
          {
              this.estadoErrorMessage = "The state must be filled out";
              estadoValidationFlag = false;
          }
  
       if(this.site.ciudad == "" && allValidationFlag == true)  
            {
                this.ciudadErrorMessage = "The city must be filled out";
                ciudadValidationFlag = false;
            }   
  
       if(this.site.favorito == "" && allValidationFlag == true)  
                {
                    this.favoritoErrorMessage = "Is this your favorite location?";
                    favoritoValidationFlag = false;
                }
  
           
            
  
    /*var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(this.data.email)){  
        this.emailErrorMessage =  'Please enter valid email';
        emailValidationFlag = false
    }else{
        this.emailErrorMessage = '';
        emailValidationFlag = true;
    }*/
  
    return (allValidationFlag && suiteValidationFlag && streetValidationFlag && addressValidationFlag && estadoValidationFlag && ciudadValidationFlag && zipValidationFlag && favoritoValidationFlag) ? true : false ;
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

  async ionViewWillEnter() {
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
      var url1 = 'https://washtt.com/v1_api_clientes_formciudades.php'
      var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
      this.cHttps(url1, data1).subscribe(
        async (res: any) => {
          this.cities = res.data
          this.cities = Object.values(this.cities)
          this.cities =  this.cities.filter(((valor: string | any[]) => valor !== 'OK_DATA'))     
           console.log(this.cities)
        })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  continue() {

    this.allErrorMessage = ''
    this.suiteErrorMessage = ''
    this.streetErrorMessage = ''
    this.addressErrorMessage = ''
    this.estadoErrorMessage = ''
    this.ciudadErrorMessage = ''
    this.zipErrorMessage = ''
    this.favoritoErrorMessage = ''
  
    if(this.validateForm()){

  this.modalCtrl.dismiss({
      suite : this.site.suite,
       street : this.site.street,
       address : this.site.address,
      zip : this.site.zip,
      estado:this.site.estado,
      ciudad:this.site.ciudad,
      defaults:this.site.favorito
      },
       
       'continue');
    }
  }
mainPopoverOptions = {

   // header: 'Main location',
    subHeader: 'Does it is your main location?',

  };
  ciudadPopoverOptions = {

   // header: 'location's city',
    subHeader: "Location's city:",

  };

estadoPopoverOptions = {

   // header: 'Main location',
    subHeader: "Location's state:",

  };

}
