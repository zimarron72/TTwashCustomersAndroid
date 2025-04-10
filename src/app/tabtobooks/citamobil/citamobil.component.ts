import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../servicios/loading.services';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController,  ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import {AddcarComponent} from '../addcar/addcar.component';
import {AddsiteComponent} from '../addsite/addsite.component';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-citamobil',
  templateUrl: './citamobil.component.html',
  styleUrls: ['./citamobil.component.scss'],
  standalone:false
})
export class CitamobilComponent  implements OnInit {

  user!:any
  vehiculo!:any
  tipov!:any
  idtoken!:any
  autenticacion_tipo!:any
  numeros:string[] = []
  fleet!:any
 
vehiculoid!:any
locations!:any
locationv!:any
detalles!:any
detallev!:any


horario = [
 
{ etiqueta: '09:00 a.m' , valor: '09:00 a.m'},
{ etiqueta: '09:30 a.m' , valor: '09:30 a.m'},
{ etiqueta: '10:00 a.m' , valor: '10:00 a.m'},
{ etiqueta: '10:30 a.m' , valor: '10:30 a.m'},
{ etiqueta: '11:00 a.m' , valor: '11:00 a.m'},
{ etiqueta: '11:30 a.m' , valor: '11:30 a.m'},
{ etiqueta: '12:00 a.m' , valor: '12:00 a.m'},
{ etiqueta: '12:30 a.m' , valor: '12:30 a.m'},
{ etiqueta: '01:00 p.m' , valor: '01:00 p.m'},
{ etiqueta: '01:30 p.m' , valor: '01:30 p.m'},
{ etiqueta: '02:00 p.m' , valor: '02:00 p.m'},
{ etiqueta: '02:30 p.m' , valor: '02:30 p.m'},
{ etiqueta: '03:00 p.m' , valor: '03:00 p.m'},
{ etiqueta: '03:30 p.m' , valor: '03:30 p.m'},
{ etiqueta: '04:00 p.m' , valor: '04:00 p.m'},
{ etiqueta: '04:30 p.m' , valor: '04:30 p.m'},
{ etiqueta: '05:00 p.m' , valor: '05:00 p.m'},
{ etiqueta: '05:30 p.m' , valor: '05:30 p.m'},
{ etiqueta: '06:00 p.m' , valor: '06:00 p.m'},
{ etiqueta: '06:30 p.m' , valor: '06:30 p.m'},
 ]

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

templ:any
tempv:any 


suite: any
street:any 
address: any
zip:any
state: any
city: any
favorito: any   

mobil = {
  tipov: "", 
 numberv: null,
 locationv: "",
power: "",
water: "",
ensitio: "",
  diacita: "",
 horacita : "",

}


hoy: any
currentDate: any

/*allErrorMessage = ''
numbervErrorMessage = ''
locationvErrorMessage = ''
powerErrorMessage = ''
waterErrorMessage = ''
ensitioErrorMessage = ''
diacitaErrorMessage = ''
horacitaErrorMessage = ''*/



  constructor(
    private localstorage: StorageService,
    private router: Router,
    private loading: LoadingService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
  ) { }


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



  validateForm(){

    var code
    var header
    var mensaje
  
    var alerta = false

    var allValidationFlag = true
    var locationvValidationFlag = true
    var numbervValidationFlag = true
    var diacitaValidationFlag = true
    var horacitaValidationFlag = true
    var powerValidationFlag = true
    var waterValidationFlag = true
    var ensitioValidationFlag = true
    
  
    if (this.mobil.numberv == null && this.mobil.locationv == "" && this.mobil.diacita == '' && this.mobil.horacita == "" && this.mobil.power == "" && this.mobil.water == "" && this.mobil.ensitio == "") {
               allValidationFlag = false ; 
               alerta = true  
              code = ''
              header = 'Waiting'
              mensaje = 'All camps must be filled out to continue'
              this.aviso(header, mensaje, code) 
    }
  
  
  
    if(this.mobil.numberv == null && allValidationFlag == true)  
    {
        
        numbervValidationFlag = false;
        numbervValidationFlag = false;
        if(alerta != true) {
        
          alerta = true
          code = ''
                header = 'Waiting'
                mensaje = 'Your vehicle number must be filled out'
                 
                this.aviso(header, mensaje, code) 
        }
    } 

    if (this.mobil.locationv == "" && allValidationFlag == true) {
      
      locationvValidationFlag = false ; 
     
      if(alerta != true) {
       
        alerta = true
        code = ''
              header = 'Waiting'
              mensaje = 'Your location must be filled out'             
              this.aviso(header, mensaje, code) 
      }
  }

  if(this.mobil.power == "" && allValidationFlag == true)  
    {
        
        powerValidationFlag = false;
        if(alerta != true) {

          alerta = true
          code = ''
                header = 'Waiting'
                mensaje = 'is there electricity supply on site?'
                 
                this.aviso(header, mensaje, code) 
        }

    }

    if(this.mobil.water == "" && allValidationFlag == true)  
      {
         
          waterValidationFlag = false;
          if(alerta != true) {

            alerta = true
            code = ''
                  header = 'Waiting'
                  mensaje = 'Is there a water supply on site?'
                   
                  this.aviso(header, mensaje, code) 
          }
         
      }

      if(this.mobil.ensitio == "" && allValidationFlag == true)  
        {
            
            ensitioValidationFlag = false;
            if(alerta != true) {

              alerta = true
              code = ''
                    header = 'Waiting'
                    mensaje = 'will you be present at the location?'
                     
                    this.aviso(header, mensaje, code) 
            }
        }

        if(this.mobil.horacita == "" && allValidationFlag == true)  
          {
             
              horacitaValidationFlag = false;
              if(alerta != true) {

                alerta = true
                code = ''
                      header = 'Waiting'
                      mensaje = 'Please select a suitable time for your appointment.'
                       
                      this.aviso(header, mensaje, code) 
              }
          } 
  
    if(this.mobil.diacita == "" && allValidationFlag == true)  
        {
          
            diacitaValidationFlag = false;
            if(alerta != true) {

              alerta = true
              code = ''
                    header = 'Waiting'
                    mensaje = 'Please select a suitable date for your appointment.'
                     
                    this.aviso(header, mensaje, code) 
            }
        }
  
     

  
           
            
  
    /*var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(this.data.email)){  
        this.emailErrorMessage =  'Please enter valid email';
        emailValidationFlag = false
    }else{
        this.emailErrorMessage = '';
        emailValidationFlag = true;
    }*/
  
    return (allValidationFlag && numbervValidationFlag && locationvValidationFlag && diacitaValidationFlag && horacitaValidationFlag  && powerValidationFlag && waterValidationFlag && ensitioValidationFlag) ? true : false ;
  }



  ngOnInit() {}
  async ionViewWillEnter() {


    this.hoy = new Date().toISOString()



    this.vehiculo=await this.localstorage.getData('vehiculo')
    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
this.vehiculoid = await this.localstorage.getData('vehiculoid')

    if(this.user) {
      let url1 = 'https://washtt.com/v1_api_clientes_getfleetcliente.php'
      let data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}
      this.cHttps(url1, data1).subscribe(
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
  
            
            this.fleet = Object.values(res.data)
            this.fleet =  this.fleet.filter(((valor: string | any[]) => valor !== '200_OK'))
          
            for (let camiones of this.fleet) 
              {
              if(camiones.row_id_cat === this.vehiculoid) {
                this.numeros.push(camiones.unit_number)
             
              }
              }
        this.numeros=Object.values(this.numeros)
    console.log('XYZ:'+this.numeros)
    
  
  
            break;
          }  
        })
        let url2 = 'https://washtt.com/v1_api_clientes_getlocationscliente.php'
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
    
              
              this.locations = Object.values(res.data)
              this.locations =  this.locations.filter(((valor: string | any[]) => valor !== '200_OK'))
    
            
    
    
              break;
            }  
          })

         /* var url3 = 'https://washtt.com/v1_api_clientes_formtipodetallesvehiculo.php'
      var data3 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
      this.cHttps(url3, data3).subscribe(
        async (res: any) => {
          this.detalles = res.data
          this.detalles = Object.values(this.detalles)
          this.detalles =  this.detalles.filter(((valor: string | any[]) => valor !== 'OK_DATA'))     
           console.log(this.detalles)
          }
        )*/
       


    }
    else{
      let mensaje = 'please login again'
      let header = 'Warning'
      let code = ''
      this.localstorage.clearData()
      this.router.navigate(['/login']);
      this.aviso(header, mensaje, code) 
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

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  continue() {

    let url2 = 'https://washtt.com/v1_api_clientes_getlocationscliente.php'
    let data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}    
    this.cHttps(url2, data2).subscribe(
       (res: any) => {
     
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

          
          this.locations = Object.values(res.data)
          this.locations =  this.locations.filter(((valor: string | any[]) => valor !== '200_OK'))  

          for (let localizaciones of this.locations) {
            if(localizaciones.id === this.locationv) {
             this.suite = localizaciones.suite
             this.street = localizaciones.street_nr
             this.address = localizaciones.address
              this.zip = localizaciones.zip
               this.state = localizaciones.state
              this.city = localizaciones.city
              if(localizaciones.default == 1) {
                this.favorito = "YES, IT'S"
              }
              else {
               this.favorito = "NOT, ITN'S"
              }
                   
      
      
            }
          } 


          break;
        }  

    
if(this.validateForm()){
        this.modalCtrl.dismiss({

          tipov : this.mobil.tipov,
          numberv : this.mobil.numberv,
          location : this.mobil.locationv,
          diacita : this.mobil.diacita,
          horacita : this.mobil.horacita,
          power : this.mobil.power,
          water : this.mobil.water,
          presencia : this.mobil.ensitio,
          suite:this.suite,
          street: this.street,
          address: this.address,
          zip: this.zip,
          state: this.state,
          city: this.city,
          favorito: this.favorito,
          },
           
           'continue');
        }


      }).closed






   






  }

  async addcar(){
    const modal = await this.modalCtrl.create({
      component: AddcarComponent
    });
    modal.present();
  
    const { data, role } = await modal.onWillDismiss();
    if (role === 'continue') {
      this.tempv = data.unitnumber
      this.loading.simpleLoader()
      if(this.user) {
        let url = 'https://washtt.com/v2_api_clientes_addcamion.php'
        let datax = { 
        idtoken: this.idtoken,
        autenticacion_tipo: this.autenticacion_tipo,
        email : this.user.email,
        model:data.model,
        mark : data.mark , 
        unitnumber : data.unitnumber,
        color : data.color,
  detail  : data.detail,
  defaults : data.defaults,
  licenseplate : data.licenseplate,
  vehicletypes : data.vehicletypes
      }
        this.cHttps(url, datax).subscribe(
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
  
              case 'TOKEN ERROR':
              code = ''
              header = 'Error'
              mensaje = 'Invalid or expired token,please login again'
              this.localstorage.clearData()
              this.router.navigate(['/login'])   
              this.aviso(header, mensaje, code) 
            break; 
  
            case 'COUNT':
              code = ''
              header = 'Warning'
              mensaje = 'OOPS! vehicle already registered'    
            
              this.aviso(header, mensaje, code) 
            break; 
  
            case 'OK_TRUCK':
            
              code = ''
              header = 'Notice'
              mensaje = 'The vehicle was successfully...Continue'
              this.aviso(header, mensaje, code) 
             
  
            break;  
  
            }
      }
    )
          }
          else {
            let mensaje = 'please login again'
      let header = 'Warning'
      let code = ''
      this.loading.dismissLoader() 
      this.localstorage.clearData()
      this.router.navigate(['/login']);
      this.aviso(header, mensaje, code)  
          }

    }

  }

  async addsite(){
    const modal = await this.modalCtrl.create({
      component: AddsiteComponent
    });
    modal.present();
  
    const { data, role } = await modal.onWillDismiss();
    if (role === 'continue') {

    this.templ=data.suite
      this.loading.simpleLoader()
      if(this.user) {
        let url = 'https://washtt.com/v1_api_clientes_addsitio.php'
        let datax = { 
        idtoken: this.idtoken,
        autenticacion_tipo: this.autenticacion_tipo,
        email : this.user.email,
        suite : data.suite , 
        street : data.street,
        address : data.address,
  state  : data.estado,
  city : data.ciudad,
  zip : data.zip,
  defaults : data.defaults
      }
        this.cHttps(url, datax).subscribe(
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
  
              case 'TOKEN ERROR':
              code = ''
              header = 'Error'
              mensaje = 'Invalid or expired token,please login again'
              this.localstorage.clearData()
              this.router.navigate(['/login'])   
              this.aviso(header, mensaje, code) 
            break; 
  
           
  
            case 'OK_TODO':
            
              code = ''
              header = 'Notice'
              mensaje = 'Location added successfully...Continue!'
              this.aviso(header, mensaje, code) 
              document.location.reload();
             
  
            break;  
  
            }
      }
    )
          }
          else {
            let mensaje = 'please login again'
      let header = 'Warning'
      let code = ''
      this.loading.dismissLoader() 
      this.localstorage.clearData()
      this.router.navigate(['/login']);
      this.aviso(header, mensaje, code)  
          }




    }
  }


}
