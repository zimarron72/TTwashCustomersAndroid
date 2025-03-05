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

tipov!:any
idtoken!:any
autenticacion_tipo!:any
numeros:string[] = []
fleet!:any
numberv!:any
vehiculoid!:any
locations!:any
locationv!:any

sitiosyard!:any
diacita!:any
horacita!:any
yard!:any

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

  constructor(
    private localstorage: StorageService,
    private router: Router,
    private loading: LoadingService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
  ) { }

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
    let tipov
    let numberv
    let yard
    let diacita
    let horacita
    return this.modalCtrl.dismiss({
tipov : this.tipov,
numberv : this.numberv,
yard : this.yard,
diacita : this.diacita,
horacita : this.horacita      
     
      },
       
       'continue');




       
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
