import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../servicios/storage.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../servicios/loading.services';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { AlertController , ModalController } from '@ionic/angular';

import { ModaladdsiteComponent  } from '../modaladdsite/modaladdsite.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
  standalone : false
})
export class LocationsComponent  implements OnInit {

locations: any
user: any
idtoken!: string
autenticacion_tipo!: string
data!: any

message = 'This modal example uses the modalController to present and dismiss modals.';

  constructor(
    private alertController: AlertController,
    private localstorage: StorageService,
    private router: Router,
    private loading : LoadingService, 
    private modalCtrl: ModalController,
 
    
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
    let url = 'https://washtt.com/v1_api_clientes_getlocationscliente.php'
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

          
          this.locations = Object.values(res.data)
          this.locations =  this.locations.filter(((valor: string | any[]) => valor !== '200_OK'))

          this.data = this.locations
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
  //this.loading.simpleLoader()
  if(this.user) {
    let url = 'https://washtt.com/v1_api_clientes_getlocationscliente.php'
    let data = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}
    this.cHttps(url, data).subscribe(
      async (res: any) => {
      //  this.loading.dismissLoader()  
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

          this.data = this.locations
console.log(this.data)


          break;
        }  
      })
  }
  else {
  
    let mensaje = 'please login again'
    let header = 'Warning'
    let code = ''
   // this.loading.dismissLoader() 
    this.localstorage.clearData()
    this.router.navigate(['/login']);
    this.aviso(header, mensaje, code) 
  }

}




async add() {
  const modal = await this.modalCtrl.create({
    component: ModaladdsiteComponent
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

  if (role === 'confirm') {

    this.procesar(data.suite,data.street,data.address,data.estado,data.ciudad,data.zip,data.favorito)

}

}







borrar(id : number , status : number) {
  this.loading.simpleLoader()
  if(this.user) {
    let url = 'https://washtt.com/v1_api_clientes_deletesitiocliente.php'
    let data = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, idsitio : id ,status : status}
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
            mensaje = 'can not be deleted: the site is your current billing address'
            this.aviso(header, mensaje, code) 
          break;  
          
        
          case '200_OK':

          code = ''
            header = 'Notice'
            mensaje = 'Location deleted successfully'
            this.aviso(header, mensaje, code) 
            this.router.navigate(['/tabs/tabprofile/nav-profile']);

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


procesar(suite : any, street: any, address : any, estado: any, ciudad: any, zip: any, defaults:any ) {
  this.loading.simpleLoader()
  if(this.user) {
    let url = 'https://washtt.com/v1_api_clientes_addsitio.php'
    let datax = { 
    idtoken: this.idtoken,
    autenticacion_tipo: this.autenticacion_tipo,
    email : this.user.email,
    suite : suite , 
    street : street,
    address : address,
state  : estado,
city : ciudad,
zip : zip,
defaults : defaults
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
          mensaje = 'Location added successfully'
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

}

