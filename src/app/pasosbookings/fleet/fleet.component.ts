import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../servicios/storage.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../servicios/loading.services';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { AlertController , ModalController  } from '@ionic/angular';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss'],
  standalone:false
})
export class FleetComponent  implements OnInit {

 fleet: any
  user: any
  idtoken!: string
  autenticacion_tipo!: string
  data!: any
 

  constructor(
      private alertController: AlertController,
    private localstorage: StorageService,
    private router: Router,
    private loading : LoadingService, 
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

   wellcome() {
   this.router.navigate(['/pasos/wellcome']);   
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
          this.fleet =  this.fleet.filter(((valor: string | any[]) => valor !== '200_OK'))



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

  if(this.user) {
    let url = 'https://washtt.com/v1_api_clientes_getfleetcliente.php'
    let data = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}
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
            
  this.fleet = Object.values(res.data)
          this.fleet =  this.fleet.filter(((valor: string | any[]) => valor !== '200_OK'))


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
 this.router.navigate(['pasos/addFleet']);
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
             let url = 'https://washtt.com/v1_api_clientes_getfleetcliente.php'
    let data = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}
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
            
  this.fleet = Object.values(res.data)
          this.fleet =  this.fleet.filter(((valor: string | any[]) => valor !== '200_OK'))


          break;
        }  
      })

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
