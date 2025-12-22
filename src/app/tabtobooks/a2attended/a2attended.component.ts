import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../servicios/storage.service';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import {  AlertController ,  ModalController } from '@ionic/angular';
import { Router, ActivatedRoute,  Params} from '@angular/router';
import { LoadingService } from '../../servicios/loading.services';
import { PaysquareComponent } from '../paysquare/paysquare.component';
import { PaysquarechargeComponent } from '../paysquarecharge/paysquarecharge.component';
import { SlidergaleryComponent } from '../slidergalery/slidergalery.component';
@Component({
  selector: 'app-a2attended',
  templateUrl: './a2attended.component.html',
  styleUrls: ['./a2attended.component.scss'],
  standalone:false
})
export class A2attendedComponent  implements OnInit {
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

  ngOnInit() {}

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
  // this.router.navigate(['/pasos/wellcome'])  
  window.location.assign("/pasos/wellcome");
}

async ionViewWillEnter() {
 this.vermensaje1 = false
this.vermensaje2 = false
this.vermensaje3 = false
    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
    this.loading.simpleLoader()
    var url = 'https://washtt.com/v2_api_clientes_getAttended.php'
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

  async Pay1A(service:string,subtotal:any,item_id:any, wash_id:any, descuento: any, total:any,numberV:any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PaysquareComponent,
       componentProps: { 
        
        concepto : 'TTS | '+service,
        subtotal : subtotal,
        descuento : descuento,
        total : total,
        item : item_id,
        wash : wash_id,
        numberV:numberV,
        modoS: 'TTS'
        
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'continue') {
//refrescar luego del pago
switch(data.accion) {

case "alogin":
  var code = ''
  var header = 'Error'
  var mensaje = 'an error occurred,please login again'
  this.localstorage.clearData()
  this.router.navigate(['/login']);
  this.aviso(header, mensaje, code)  
break;    

case "tipopagos":
   this.router.navigate(['/tabs/tabtobooks/tipopagos'])  
break;

case "successpay":
 this.router.navigate(['/pasos/pagoexitoso'])  
break; 

case "successpaycond":
 this.router.navigate(['/pasos/pagocond'])  
break;



}


    } 
  
  }

  async Pay2A(service:string,subtotal:any,item_id:any, wash_id:any, descuento: any, total:any,recargo_monto:any, recargo_concepto:any,numberV:any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PaysquarechargeComponent,
       componentProps: { 
        
        concepto : 'TTS | '+service,
        subtotal : subtotal,
        descuento : descuento,
        total : total,
        item : item_id,
        wash : wash_id,
        recargo_concepto : recargo_concepto,
        recargo_monto : recargo_monto,
        numberV : numberV,
        modoS: 'TTS'
        
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'continue') {
//refrescar luego del pago
switch(data.accion) {

case "alogin":
   var code = ''
  var header = 'Error'
  var mensaje = 'an error occurred,please login again'
  this.localstorage.clearData()
  this.router.navigate(['/login']);
  this.aviso(header, mensaje, code) 
break;    

case "tipopagos":
   this.router.navigate(['/tabs/tabtobooks/tipopagos'])  
break;

case "successpay":
 this.router.navigate(['/pasos/pagoexitoso'])  
break; 

case "successpaycond":
this.router.navigate(['/pasos/pagocond'])  
break;



}


    } 
  
  }

  async Galery1(id: any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: SlidergaleryComponent,
      componentProps: { 
        item: id,
        modoService:'TTS'
        
      }
    });
     modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'continue') {



    } 
  }

    async Pay1B(service:string,vehiculo:any,subtotal:any,item_id:any, wash_id:any, descuento: any, total:any,numberV:any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PaysquareComponent,
       componentProps: { 
        
        concepto : 'OS | '+service +' '+vehiculo,
        subtotal : subtotal,
        descuento : descuento,
        total : total,
        item : item_id,
        wash : wash_id,
        modoS: 'OS',
        numberV:numberV
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'continue') {
//refrescar luego del pago
switch(data.accion) {

case "alogin":
    var code = ''
  var header = 'Error'
  var mensaje = 'an error occurred,please login again'
  this.localstorage.clearData()
  this.router.navigate(['/login']);
  this.aviso(header, mensaje, code)  
break;    

case "tipopagos":
   this.router.navigate(['/tabs/tabtobooks/tipopagos'])  
break;

case "successpay":
this.router.navigate(['/pasos/pagoexitoso']) 
break; 

case "successpaycond":
this.router.navigate(['/pasos/pagocond']) 
break;



}


    } 
  
  }

  async Pay2B(service:string,vehiculo:any,subtotal:any,item_id:any, wash_id:any, descuento: any, total:any,recargo_monto:any, recargo_concepto:any,numberV:any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PaysquarechargeComponent,
       componentProps: { 
        
        concepto : 'OS | '+service +' '+vehiculo,
        subtotal : subtotal,
        descuento : descuento,
        total : total,
        item : item_id,
        wash : wash_id,
        recargo_concepto : recargo_concepto,
        recargo_monto : recargo_monto,
         modoS: 'OS',
         numberV:numberV
        
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'continue') {
//refrescar luego del pago
switch(data.accion) {

case "alogin":
    var code = ''
  var header = 'Error'
  var mensaje = 'an error occurred,please login again'
  this.localstorage.clearData()
  this.router.navigate(['/login']);
  this.aviso(header, mensaje, code) 
break;    

case "tipopagos":
   this.router.navigate(['/tabs/tabtobooks/tipopagos'])  
break;

case "successpay":
this.router.navigate(['/pasos/pagoexitoso']) 
break; 

case "successpaycond":
this.router.navigate(['/pasos/pagocond']) 
break;



}


    } 
  
  }

  async Galery2(id: any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: SlidergaleryComponent,
      componentProps: { 
        item: id,
        modoService:'OS'
        
      }
    });
     modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'continue') {



    } 
  }


   async Pay1C(service:string,vehiculo:any,subtotal:any,item_id:any, wash_id:any, descuento: any, total:any, numberV:any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PaysquareComponent,
       componentProps: { 
        
        concepto : 'FS | '+service +' '+vehiculo,
        subtotal : subtotal,
        descuento : descuento,
        total : total,
        item : item_id,
        wash : wash_id,
        modoS: 'FS',
        numberV:numberV
        
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'continue') {
//refrescar luego del pago
switch(data.accion) {

case "alogin":
    var code = ''
  var header = 'Error'
  var mensaje = 'an error occurred,please login again'
  this.localstorage.clearData()
  this.router.navigate(['/login']);
  this.aviso(header, mensaje, code) 
break;    

case "tipopagos":
   this.router.navigate(['/tabs/tabtobooks/tipopagos'])  
break;

case "successpay":
this.router.navigate(['/pasos/pagoexitoso']) 
break; 

case "successpaycond":
this.router.navigate(['/pasos/pagocond'])   
break;

}


    } 
  
  }

  async Pay2C(service:string,vehiculo:any,subtotal:any,item_id:any, wash_id:any, descuento: any, total:any,recargo_monto:any, recargo_concepto:any,numberV:any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PaysquarechargeComponent,
       componentProps: { 
        
        concepto : 'FS | '+service +' '+vehiculo,
        subtotal : subtotal,
        descuento : descuento,
        total : total,
        item : item_id,
        wash : wash_id,
        recargo_concepto : recargo_concepto,
        recargo_monto : recargo_monto,
        modoS: 'FS',
        numberV:numberV
        
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'continue') {
//refrescar luego del pago
switch(data.accion) {

case "alogin":
    var code = ''
  var header = 'Error'
  var mensaje = 'an error occurred,please login again'
  this.localstorage.clearData()
  this.router.navigate(['/login']);
  this.aviso(header, mensaje, code)  
break;    

case "tipopagos":
   this.router.navigate(['/tabs/tabtobooks/tipopagos'])  
break;

case "successpay":
 this.router.navigate(['/pasos/pagoexitoso']) 
break; 

case "successpaycond":
this.router.navigate(['/pasos/pagocond'])   
break;



}


    } 
  
  }

  async Galery3(id: any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: SlidergaleryComponent,
      componentProps: { 
        item: id,
        modoService:'FS'
      }
    });
     modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'continue') {



    } 
  }

}
