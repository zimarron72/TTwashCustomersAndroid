import { Component, OnInit } from '@angular/core';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController  } from '@ionic/angular';
import { Router} from '@angular/router';
import { LoadingService } from '../../servicios/loading.services';
import {AutenticacionService} from '../../servicios/autenticacion'
@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.scss'],
  standalone:false
})
export class Paso1Component  implements OnInit {

user: any
  tipos!: any;
  detalles!:any
  idtoken!: any
  autenticacion_tipo!:any
  vehiculos:any
  modelos:any
  ErrorMessage = ''


  truck = {
    tipov: "",
    model: "",
    brand: "",
    color : "",
    license: "",
    unitnumber: '',
    detallev: "",
    favorito: ""
  }

  select:boolean = true
  new:boolean = false
  fleet:boolean = false
fleetx: any
  constructor(
      private localstorage:StorageService, 
    private alertController: AlertController,
     private router: Router,
      private loading: LoadingService,
      private AutenticacionService : AutenticacionService,
  ) { 
   this.select = true
  this.new = false
  this.fleet = false
  }

  ngOnInit() {}

wellcome() {
   this.router.navigate(['/pasos/wellcome']);   
}

 validateForm(){ 

    var ValidationFlag = true


       if(this.truck.tipov == "")  
    {
        this.ErrorMessage = "The type of your vehicle must be filled out";
        ValidationFlag = false;
    } 
  
  
    else if(this.truck.model == "")  
    {
        this.ErrorMessage = "The model of your vehicle must be filled out";
        ValidationFlag = false;
    } 
  
    else if(this.truck.brand == "")  
        {
            this.ErrorMessage = "The brand of your vehicle must be filled out";
           ValidationFlag = false;
        }
  
    else if(this.truck.color == "")  
          {
              this.ErrorMessage = "The color of your vehicle must be filled out";
              ValidationFlag = false;
          }   
  
      else if(this.truck.license == "")  
          {
              this.ErrorMessage = "Your license must be filled out";
              ValidationFlag = false;
          }
  
       else if(this.truck.unitnumber == '')  
            {
                this.ErrorMessage = "The vehicle's number must be filled out or a number";
                ValidationFlag = false;
            }   
  
       else if(this.truck.detallev == "")  
                {
                    this.ErrorMessage = "What does your vehicle look like?";
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

   var url = 'https://washtt.com/v2_api_clientes_get_tipodevehiculos.php'
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
            console.log('xxxxxxxxxx'+this.vehiculos) 
        }
                      
      }
    )
      var url1 = 'https://washtt.com/v1_api_clientes_formtipodetallesvehiculo.php'
      var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
      this.cHttps(url1, data1).subscribe(
        async (res: any) => {
          this.detalles = res.data
          this.detalles = Object.values(this.detalles)
          this.detalles =  this.detalles.filter(((valor: string | any[]) => valor !== 'OK_DATA'))     
           console.log('yyyyyyyyyyyy'+this.detalles)
          }
        )

    let url2 = 'https://washtt.com/v1_api_clientes_getfleetcliente.php'
    let data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}
    this.cHttps(url2, data2).subscribe(
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
        
          case 'TOKEN ERROR':
            code = ''
            header = 'Error'
            mensaje = 'Invalid or expired token,please login again'
            this.localstorage.clearData()
            this.router.navigate(['/login'])   
            this.aviso(header, mensaje, code) 
          break;   
        
          case '200_OK':

          
            this.fleetx = Object.values(res.data)
          this.fleetx =  this.fleetx.filter(((valor: string | any[]) => valor !== '200_OK'))
         


          break;
        }  
      })
  

        
  }

  doRefresh(event: { target: { complete: () => void; }; }) {
  event.target.complete();

 var url = 'https://washtt.com/v2_api_clientes_get_tipodevehiculos.php'
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
            console.log('xxxxxxxxxx'+this.vehiculos) 
        }
                      
      }
    )
      var url1 = 'https://washtt.com/v1_api_clientes_formtipodetallesvehiculo.php'
      var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
      this.cHttps(url1, data1).subscribe(
        async (res: any) => {
          this.detalles = res.data
          this.detalles = Object.values(this.detalles)
          this.detalles =  this.detalles.filter(((valor: string | any[]) => valor !== 'OK_DATA'))     
           console.log('yyyyyyyyyyyy'+this.detalles)
          }
        )

    let url2 = 'https://washtt.com/v1_api_clientes_getfleetcliente.php'
    let data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}
    this.cHttps(url2, data2).subscribe(
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
        
          case 'TOKEN ERROR':
            code = ''
            header = 'Error'
            mensaje = 'Invalid or expired token,please login again'
            this.localstorage.clearData()
            this.router.navigate(['/login'])   
            this.aviso(header, mensaje, code) 
          break;   
        
          case '200_OK':

          
            this.fleetx = Object.values(res.data)
          this.fleetx =  this.fleetx.filter(((valor: string | any[]) => valor !== '200_OK'))
         


          break;
        }  
      })

}

    async selectVehiculos(event:any){
      var car = event.detail.value
   
            var url = 'https://washtt.com/v2_api_clientes_get_modelos.php'
        var data = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, id: car }
        this.cHttps(url, data).subscribe(
          async (res: any) => {
            this.loading.dismissLoader()
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
                this.modelos = res.data 
                console.log('zzzzzzzz'+this.modelos)     
            }
                          
          }
        )  
  }

  detallesPopoverOptions = {

   // header: 'General details of the vehicle',
    subHeader: 'We count on your sincere selection:',

  };

  tipoVehiclePopoverOptions = {

   // header: 'General details of the vehicle',
    subHeader: 'If not listed, select Other:',

  };

    modeloVehiclePopoverOptions = {

   // header: 'General details of the vehicle',
    subHeader: 'Within the type of your vehicle, how can we classify it?:',

  };


mainPopoverOptions = {

   // header: 'Main vehicle',
    subHeader: 'Does it is main vehicle your fleet?',

  };

 async continue() {
    if(this.validateForm()){
  this.loading.simpleLoader()
        let url = 'https://washtt.com/v2_api_clientes_addcamion.php'
        let data = { 
        modo : '1',  
        idtoken: this.idtoken,
        autenticacion_tipo: this.autenticacion_tipo,
        email : this.user.email,
        vehicletypes : this.truck.tipov,
      model : this.truck.model, // id de la category del vehiculo en el producto
      mark : this.truck.brand,
     color : this.truck.color,
     licenseplate:this.truck.license,
     detail:this.truck.detallev,
     unitnumber:this.truck.unitnumber,
     defaults: 0
      }
        this.cHttps(url, data).subscribe(
          async (res: any) => {
            this.loading.dismissLoader()  
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
            
            case 'OK_TRUCK':        
            
             
  let itemcart = {
 camiont : res.data.tipovehiculo,
     camionmdl : res.data.tipomodelo, 
      camionmar : this.truck.brand,
     camioncolor : this.truck.color,
     license:this.truck.license,
     camiondetalles:this.truck.detallev,
     camionn:this.truck.unitnumber,
     image:res.data.image
  }
 
await this.localstorage.setObject('itemcart',itemcart)
this.router.navigate(['pasos/paso2', this.truck.model]);
            break;  
  
            }
      }
    )
    }
  else {
    this.loading.dismissLoader()      
    let mensaje   
    mensaje = this.ErrorMessage
    await this.aviso('',mensaje,'')
  }

  }  

carNew(){
    this.select = false
  this.new = true
  this.fleet = false
}

carFleet() {
  this.select = false
  this.new = false
  this.fleet = true
}

cancel(){
  this.select = true
  this.new = false
  this.fleet = false
}

selectVehiculo(id:any) {
   let url = 'https://washtt.com/v2_api_clientes_selectVehiculoFleet.php'
    let data = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email, id:id}
    this.cHttps(url, data).subscribe(
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
        
          case 'TOKEN ERROR':
            code = ''
            header = 'Error'
            mensaje = 'Invalid or expired token,please login again'
            this.localstorage.clearData()
            this.router.navigate(['/login'])   
            this.aviso(header, mensaje, code) 
          break;   
        
          case '200_OK':           
         
  let itemcart = {
 camiont : res.data.tipovehiculo,
     camionmdl : res.data.tipomodelo, 
      camionmar : res.data.marca,
     camioncolor : res.data.color,
     license:res.data.license,
     camiondetalles:res.data.detalle,
     camionn: res.data.unitnumber,
     image:res.data.image
  }
 
await this.localstorage.setObject('itemcart',itemcart)
this.router.navigate(['pasos/paso2', id]);

          break;
        }  
      })
}
 
}
