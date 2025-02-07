import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../servicios/storage.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../servicios/loading.services';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { AlertController , ModalController  } from '@ionic/angular';
import { ModaladdtruckComponent  } from '../modaladdtruck/modaladdtruck.component';
@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss'],
  standalone: false
})
export class FleetComponent  implements OnInit {

  fleet: any
  user: any
  idtoken!: string
  autenticacion_tipo!: string
  data!: any
  show:boolean = true

  constructor(
    private alertController: AlertController,
    private localstorage: StorageService,
    private router: Router,
    private loading : LoadingService, 
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
   
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

async ionViewWillEnter() { 
  this.user = JSON.parse(await this.localstorage.getData('usuario'))
  this.idtoken = await this.localstorage.getData('idtoken')
  this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
  this.loading.simpleLoader()
  if(this.user) {
    let url = 'https://washtt.com/v1_api_clientes_getfleetcliente.php'
    let data = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}
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
          if(!this.fleet) {
            this.show = false
            }
          this.fleet =  this.fleet.filter(((valor: string | any[]) => valor !== '200_OK'))

          this.data = this.fleet
         
console.log(this.data)


          break;
        }  
      })
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

doRefresh(event: { target: { complete: () => void; }; }) {
  event.target.complete();
  this.loading.simpleLoader()
  if(this.user) {
    let url = 'https://washtt.com/v1_api_clientes_getfleetcliente.php'
    let data = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}
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
          if(!this.fleet) {
            this.show = false
            }
          this.fleet =  this.fleet.filter(((valor: string | any[]) => valor !== '200_OK'))

          this.data = this.fleet
console.log(this.data)


          break;
        }  
      })
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

async add() {
  const modal = await this.modalCtrl.create({
    component:  ModaladdtruckComponent
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

  if (role === 'confirm') {
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
            this.router.navigate(['/tabs/tabprofile/nav-profile']);
            this.aviso(header, mensaje, code) 
          break; 

          case 'OK_TRUCK':
          
            code = ''
            header = 'Notice'
            mensaje = 'The vehicle was successfully added'
            this.aviso(header, mensaje, code) 
            this.router.navigate(['/tabs/tabprofile/nav-profile']);

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
if(role === 'cancel'){

  this.router.navigate(['/tabs/tabprofile/nav-profile']); 

}
}

borrar(id : number) {
  this.loading.simpleLoader()
  if(this.user) {
    let url = 'https://washtt.com/v1_api_clientes_deletevehiculocliente.php'
    let data = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, idvehiculo : id ,email : this.user.email}
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
        
          case 'TOKEN ERROR':
            code = ''
            header = 'Error'
            mensaje = 'Invalid or expired token,please login again'
            this.localstorage.clearData()
            this.router.navigate(['/login'])   
            this.aviso(header, mensaje, code) 
          break;  
          case 'NO BORRAR':
            code = ''
            header = 'Warning'
            mensaje = 'Sorry, can not be deleted: your fleet must contain at least one vehicle'
            this.aviso(header, mensaje, code) 
          break;  
          
        
          case '200_OK':

          code = ''
            header = 'Notice'
            mensaje = 'Vehicle deleted successfully'
            this.aviso(header, mensaje, code)            
            this.router.navigate(['/tabs/tabprofile/nav-profile']);

          break;
        }  
      })
  }
  else {
    this.loading.dismissLoader()    
    this.localstorage.clearData()
    this.router.navigate(['/login']);
    let mensaje = 'please login again'
    let header = 'Warning'
    let code = ''
    this.aviso(header, mensaje, code) 
  }  
}

}
