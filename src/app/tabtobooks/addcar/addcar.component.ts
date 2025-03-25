import { Component, OnInit } from '@angular/core';
import {   ModalController } from '@ionic/angular';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.scss'],
  standalone:false
})
export class AddcarComponent  implements OnInit {

 
  tipos!: any;
  detalles!:any
  idtoken!: any
  autenticacion_tipo!:any
  vehiculo:any
  
  allErrorMessage = ''
  tipovErrorMessage = ''
  modelErrorMessage = ''
  brandErrorMessage = ''
  colorErrorMessage = ''
  licenseErrorMessage = ''
  unitnumberErrorMessage = ''
  detallevErrorMessage = ''
  favoritoErrorMessage = ''

  truck = {
    tipov: "",
    model: "",
    brand: "",
    color : "",
    license: "",
    unitnumber: null,
    detallev: "",
    favorito: ""
  }



  constructor(
    private modalCtrl: ModalController,
    private localstorage:StorageService, 
  ) { }

  ngOnInit() {}

  validateForm(){

  

    var allValidationFlag = true
    var modelValidationFlag = true
    var brandValidationFlag = true
    var colorValidationFlag = true
    var licenseValidationFlag = true
    var unitnumberValidationFlag = true
    var detallevValidationFlag = true
    var favoritoValidationFlag = true
    
  
    if (this.truck.model == "" && this.truck.model == "" && this.truck.brand == "" && this.truck.color == "" && this.truck.license == "" && this.truck.unitnumber == null && this.truck.detallev == "" && this.truck.favorito == "" ) {
        this.allErrorMessage = "All camps must be filled out";
        allValidationFlag = false ; 
    }
  
   
  
    if(this.truck.model == "" && allValidationFlag == true)  
    {
        this.modelErrorMessage = "The model of your vehicle must be filled out";
        modelValidationFlag = false;
    } 
  
    if(this.truck.brand == "" && allValidationFlag == true)  
        {
            this.brandErrorMessage = "The brand of your vehicle must be filled out";
            brandValidationFlag = false;
        }
  
    if(this.truck.color == "" && allValidationFlag == true)  
          {
              this.colorErrorMessage = "The color of your vehicle must be filled out";
              colorValidationFlag = false;
          }   
  
      if(this.truck.license == "" && allValidationFlag == true)  
          {
              this.licenseErrorMessage = "Your license must be filled out";
              licenseValidationFlag = false;
          }
  
       if(this.truck.unitnumber == null && allValidationFlag == true)  
            {
                this.unitnumberErrorMessage = "The vehicle's number must be filled out or a number";
                unitnumberValidationFlag = false;
            }   
  
       if(this.truck.detallev == "" && allValidationFlag == true)  
                {
                    this.detallevErrorMessage = "What does your vehicle look like?";
                    detallevValidationFlag = false;
                }

        if(this.truck.favorito == "" && allValidationFlag == true)  
                  {
                      this.favoritoErrorMessage = "Is this your favorite vehicle?";
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
  
    return (allValidationFlag  && modelValidationFlag && brandValidationFlag && colorValidationFlag && licenseValidationFlag && unitnumberValidationFlag && favoritoValidationFlag && detallevValidationFlag) ? true : false ;
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
    this.vehiculo=await this.localstorage.getData('vehiculo')
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')  


      var url1 = 'https://washtt.com/v1_api_clientes_formtipodetallesvehiculo.php'
      var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
      this.cHttps(url1, data1).subscribe(
        async (res: any) => {
          this.detalles = res.data
          this.detalles = Object.values(this.detalles)
          this.detalles =  this.detalles.filter(((valor: string | any[]) => valor !== 'OK_DATA'))     
           console.log(this.detalles)
          }
        )
        
  }



  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async continue() {

    this.allErrorMessage = ''
    this.modelErrorMessage = ''
    this.brandErrorMessage = ''
    this.colorErrorMessage = ''
    this.licenseErrorMessage = ''
    this.unitnumberErrorMessage = ''
    this.detallevErrorMessage = ''
    this.favoritoErrorMessage = ''

    if(this.validateForm()){


  this.modalCtrl.dismiss({
      
      vehicletypes : await this.localstorage.getData('vehiculoid'),
      model : this.truck.model,
      mark : this.truck.brand,
     color : this.truck.color,
     licenseplate:this.truck.license,
     detail:this.truck.detallev,
     unitnumber:this.truck.unitnumber,
     defaults:this.truck.favorito
      },
       
       'continue');
  }

}


}
