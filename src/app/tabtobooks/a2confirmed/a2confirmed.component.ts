import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../servicios/storage.service';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import {  AlertController ,  ModalController } from '@ionic/angular';
import { Router, ActivatedRoute,  Params} from '@angular/router';
import { LoadingService } from '../../servicios/loading.services';

import { AcancelarComponent } from '../acancelar/acancelar.component';
@Component({
  selector: 'app-a2confirmed',
  templateUrl: './a2confirmed.component.html',
  styleUrls: ['./a2confirmed.component.scss'],
  standalone:false
})
export class A2confirmedComponent  implements OnInit {
idtoken!: string
  autenticacion_tipo!: string
  token_notificacion!: string
  user: any

  conjunto1:any 
  conjunto2:any 
  conjunto3:any 

  vermensaje1: boolean = false
vermensaje2: boolean = false
vermensaje3: boolean = false
  constructor(
      private localstorage: StorageService,
    private router: Router,
    private loading: LoadingService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
  ) { }

  isObjectEmpty(obj: any): boolean {
  return Object.keys(obj).length === 0;
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

 wellcome() {
   //this.router.navigate(['/pasos/wellcome'])
     window.location.assign("/pasos/wellcome");
} 

  ngOnInit() {}
 
 async ionViewWillEnter() {
 this.vermensaje1 = false
this.vermensaje2 = false
this.vermensaje3 = false
    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
    this.loading.simpleLoader()
    var url = 'https://washtt.com/v2_api_clientes_getConfirmed.php'
    var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email}
    this.cHttps(url, data1).subscribe(
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
            mensaje = 'Sorry, an error occurred,please login again2'
            this.localstorage.clearData()
            this.router.navigate(['/login'])       
            this.aviso(header, mensaje, code)              
            break;         
          case 'TOKEN ERROR':
          code = '01'
          header = 'Error' 
          mensaje = 'Invalid or expired token,please login again'
          this.localstorage.clearData()
          this.router.navigate(['/login'])   
          this.aviso(header,mensaje,code)                       
          break;            
         
          
      default:

 if(this.isObjectEmpty(res.data.TTS)) {
     this.vermensaje1 = true
      }
 else {
this.conjunto1 = Object.values(res.data.TTS) 
 this.vermensaje1 = false
 }  
 
  if(this.isObjectEmpty(res.data.OS)) {
     this.vermensaje2 = true
      }
 else {
this.conjunto2 = Object.values(res.data.OS) 
 this.vermensaje2 = false
 }  

 if(this.isObjectEmpty(res.data.FS)) {
     this.vermensaje3 = true
      }
 else {
this.conjunto3 = Object.values(res.data.FS) 
 this.vermensaje3 = false
 }  


  
     
      console.log(res.data)
       
    
     


         
        }
                      
      }
    )
  } 

  async doRefresh(event: { target: { complete: () => void; }; }) {
 this.vermensaje1 = false
this.vermensaje2 = false
this.vermensaje3 = false
    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')

    var url = 'https://washtt.com/v2_api_clientes_getConfirmed.php'
    var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email}
    this.cHttps(url, data1).subscribe(
      async (res: any) => {
       if (event)
          event.target.complete(); 
        console.log(res)
        let mensaje
        let header
        let code
        switch (res.data.respuesta) {
          case 'ERROR':
            code = '01'
            header = 'Error'
            mensaje = 'Sorry, an error occurred,please login again2'
            this.localstorage.clearData()
            this.router.navigate(['/login'])       
            this.aviso(header, mensaje, code)              
            break;         
          case 'TOKEN ERROR':
          code = '01'
          header = 'Error' 
          mensaje = 'Invalid or expired token,please login again'
          this.localstorage.clearData()
          this.router.navigate(['/login'])   
          this.aviso(header,mensaje,code)                       
          break;            
         
          
      default:

    
      if(this.isObjectEmpty(res.data.TTS)) {
     this.vermensaje1 = true
      }
 else {
this.conjunto1 = Object.values(res.data.TTS) 
 this.vermensaje1 = false
 }  
 
  if(this.isObjectEmpty(res.data.OS)) {
     this.vermensaje2 = true
      }
 else {
this.conjunto2 = Object.values(res.data.OS) 
 this.vermensaje2 = false
 }  

 if(this.isObjectEmpty(res.data.FS)) {
     this.vermensaje3 = true
      }
 else {
this.conjunto3 = Object.values(res.data.FS) 
 this.vermensaje3 = false
 } 
  
     
      console.log(res.data)
       
    
     


         
        }
                      
      }
    )
  } 


 async Cancelar1(id: number): Promise<void> {
 
 const modal = await this.modalCtrl.create({
      component: AcancelarComponent
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm')
 {

     
      this.loading.simpleLoader()
     var url = 'https://washtt.com/v1_api_clientes_cancelar_item_order.php'
     var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email, itemid:id }
     this.cHttps(url, data1).subscribe(
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
            mensaje = 'Sorry, an error occurred,please login again2'
            this.localstorage.clearData()
            this.router.navigate(['/login'])       
            this.aviso(header, mensaje, code)              
            break;         
          case 'TOKEN ERROR':
          code = '01'
          header = 'Error' 
          mensaje = 'Invalid or expired token,please login again'
          this.localstorage.clearData()
          this.router.navigate(['/login'])   
          this.aviso(header,mensaje,code)                       
          break;  
          
          case 'MISMODIA':
            code = ''
            header = 'Warning' 
            mensaje = res.data.mensaje              
            this.aviso(header,mensaje,code)         
          break;  

          case 'DIASDESPUESCITA':
           code = ''
           header = 'Warning' 
           mensaje = res.data.mensaje              
           this.aviso(header,mensaje,code)  
          break; 

          case 'FALTAUNDIA':
            code = ''
           header = 'Warning' 
           mensaje = res.data.mensaje              
           this.aviso(header,mensaje,code)  
          break; 

          case '200_OK':
          this.router.navigate(['/pasos/wellcome']) 
     code = ''
          header = 'Warning' 
          mensaje = 'Appointment successfully cancelled'             
          this.aviso(header,mensaje,code)      
                    
              
        
          break;
          
     
         
        }
                      
      }
    ) }


  }


async Cancelar2(id: number): Promise<void> {
 
 const modal = await this.modalCtrl.create({
      component: AcancelarComponent
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm')
 {

     
      this.loading.simpleLoader()
     var url = 'https://washtt.com/v2_api_clientes_cancelCitaOther.php'
     var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email, itemid:id }
     this.cHttps(url, data1).subscribe(
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
            mensaje = 'Sorry, an error occurred,please login again2'
            this.localstorage.clearData()
            this.router.navigate(['/login'])       
            this.aviso(header, mensaje, code)              
            break;         
          case 'TOKEN ERROR':
          code = '01'
          header = 'Error' 
          mensaje = 'Invalid or expired token,please login again'
          this.localstorage.clearData()
          this.router.navigate(['/login'])   
          this.aviso(header,mensaje,code)                       
          break;  
          
          case 'MISMODIA':
            code = ''
            header = 'Warning' 
            mensaje = res.data.mensaje              
            this.aviso(header,mensaje,code)         
          break;  

          case 'DIASDESPUESCITA':
           code = ''
           header = 'Warning' 
           mensaje = res.data.mensaje              
           this.aviso(header,mensaje,code)  
          break; 

          case 'FALTAUNDIA':
            code = ''
           header = 'Warning' 
           mensaje = res.data.mensaje              
           this.aviso(header,mensaje,code)  
          break; 

          case '200_OK':
 this.router.navigate(['pasos/welcome'])  
          code = ''
          header = 'Warning' 
          mensaje = 'Appointment successfully cancelled'             
          this.aviso(header,mensaje,code) 
        
                    
              
        
          break;
          
     
         
        }
                      
      }
    ) }


  }




  async Cancelar3(id: number): Promise<void> {
 
 const modal = await this.modalCtrl.create({
      component: AcancelarComponent
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm')
 {

     
      this.loading.simpleLoader()
     var url = 'https://washtt.com/v2_api_clientes_cancelCitaFleet.php'
     var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email, itemid:id }
     this.cHttps(url, data1).subscribe(
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
            mensaje = 'Sorry, an error occurred,please login again2'
            this.localstorage.clearData()
            this.router.navigate(['/login'])       
            this.aviso(header, mensaje, code)              
            break;         
          case 'TOKEN ERROR':
          code = '01'
          header = 'Error' 
          mensaje = 'Invalid or expired token,please login again'
          this.localstorage.clearData()
          this.router.navigate(['/login'])   
          this.aviso(header,mensaje,code)                       
          break;  
          
          case 'MISMODIA':
            code = ''
            header = 'Warning' 
            mensaje = res.data.mensaje              
            this.aviso(header,mensaje,code)         
          break;  

          case 'DIASDESPUESCITA':
           code = ''
           header = 'Warning' 
           mensaje = res.data.mensaje              
           this.aviso(header,mensaje,code)  
          break; 

          case 'FALTAUNDIA':
            code = ''
           header = 'Warning' 
           mensaje = res.data.mensaje              
           this.aviso(header,mensaje,code)  
          break; 

          case '200_OK':
this.router.navigate(['/pasos/wellcome']) 
       
          code = ''
          header = 'Warning' 
          mensaje = 'Appointment successfully cancelled'             
          this.aviso(header,mensaje,code)
          
                    
              
        
          break;
          
     
         
        }
                      
      }
    ) }


  }

}
