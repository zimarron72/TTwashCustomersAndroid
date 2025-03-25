import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../servicios/loading.services';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController , ModalController  } from '@ionic/angular';
import { Router } from '@angular/router';
import {AddcarComponent} from '../addcar/addcar.component';
@Component({
  selector: 'app-citayard',
  templateUrl: './citayard.component.html',
  styleUrls: ['./citayard.component.scss'],
  standalone:false
})
export class CitayardComponent  implements OnInit {
user!:any
vehiculo!:any


idtoken!:any
autenticacion_tipo!:any
numeros:string[] = []
fleet!:any
vehiculoid!:any
sitiosyard!:any


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

tempv:any

onsite = {
  tipov: "",
 yard: "",
  diacita: "",
 horacita : "",
 numberv: null

}

allErrorMessage = ''
yardErrorMessage = ''
diacitaErrorMessage = ''
horacitaErrorMessage = ''
numbervErrorMessage = ''


  constructor(
    private localstorage: StorageService,
    private router: Router,
    private loading: LoadingService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
  ) { }

  validateForm(){

  

    var allValidationFlag = true
    var yardValidationFlag = true
    var numbervValidationFlag = true
    var diacitaValidationFlag = true
    var horacitaValidationFlag = true
    
  
    if (this.onsite.numberv == null && this.onsite.yard == "" && this.onsite.diacita == '' && this.onsite.horacita == ""  ) {
        this.allErrorMessage = "All camps must be filled out to continue";
        allValidationFlag = false ; 
    }
  
  
  
    if(this.onsite.numberv == null && allValidationFlag == true)  
    {
        this.numbervErrorMessage = "Your vehicle must be filled out";
        numbervValidationFlag = false;
    } 

    if (this.onsite.yard == "" && allValidationFlag == true) {
      this.yardErrorMessage = "The yard must be filled out";
      yardValidationFlag = false ; 
  }
  
    if(this.onsite.diacita == "" && allValidationFlag == true)  
        {
            this.diacitaErrorMessage = "Please select a suitable day for your appointment.";
            diacitaValidationFlag = false;
        }
  
    if(this.onsite.horacita == "" && allValidationFlag == true)  
          {
              this.horacitaErrorMessage = "Please select a suitable time for your appointment.";
              horacitaValidationFlag = false;
          }   

  
           
            
  
    /*var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(this.data.email)){  
        this.emailErrorMessage =  'Please enter valid email';
        emailValidationFlag = false
    }else{
        this.emailErrorMessage = '';
        emailValidationFlag = true;
    }*/
  
    return (allValidationFlag && numbervValidationFlag && yardValidationFlag && diacitaValidationFlag && horacitaValidationFlag ) ? true : false ;
  }




  ngOnInit() {}

  async ionViewWillEnter() {
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
    



          var url2 = 'https://washtt.com/v1_api_clientes_sitiosyard.php'
          var data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
          this.cHttps(url2, data2).subscribe(
            async (res: any) => {
              this.sitiosyard = res.data
              this.sitiosyard = Object.values(this.sitiosyard)
              this.sitiosyard =  this.sitiosyard.filter(((valor: string | any[]) => valor !== 'OK_DATA'))     
               console.log(this.sitiosyard)
              }
            )
       


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

    this.allErrorMessage = ''
    this.numbervErrorMessage = ''
    this.yardErrorMessage = ''
    this.diacitaErrorMessage = ''
    this.horacitaErrorMessage = ''
    
  
    if(this.validateForm()){

  
     this.modalCtrl.dismiss({
      
tipov : this.onsite.tipov,
numberv : this.onsite.numberv,
yard : this.onsite.yard,
diacita : this.onsite.diacita,
horacita : this.onsite.horacita      
     
      },
       
       'continue');


    }

       
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

}
