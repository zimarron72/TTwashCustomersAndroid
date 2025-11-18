import { Component, OnInit,  } from '@angular/core';
import { StorageService } from '../../servicios/storage.service';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import {  AlertController ,  ModalController } from '@ionic/angular';
import { Router, ActivatedRoute,  Params} from '@angular/router';
import { LoadingService } from '../../servicios/loading.services';

import { AcancelarComponent } from '../acancelar/acancelar.component';
import { AarchivarComponent } from '../aarchivar/aarchivar.component';

import { PaysquareComponent } from '../paysquare/paysquare.component';
import { PaysquarechargeComponent } from '../paysquarecharge/paysquarecharge.component';
import { SlidergaleryComponent } from '../slidergalery/slidergalery.component';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
  standalone : false
})
export class CitasComponent  implements OnInit {

  n!: number

  vermensaje : boolean = false
verfiltros : boolean = true

 
  verenlace1 : boolean = false 
  verenlace2 : boolean = false

  idtoken!: string
  autenticacion_tipo!: string
  token_notificacion!: string
  user: any

  conjunto:any //onevehiculo
  terms: any = ""
 
  all:any
  paid:any
  cancel:any


  constructor(
    private localstorage: StorageService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private loading: LoadingService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
   
  ) { 

    this.n = this.rutaActiva.snapshot.params['n'];
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.n = params['n'];    
      }
    );


  }

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

  ngOnInit() {}




  async ionViewWillEnter() {
    this.terms = ""
    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
    this.loading.simpleLoader()
    var url = 'https://washtt.com/v2_api_clientes_getipoappointment.php'
    var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email, n : this.n }
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

      if(this.n != 11) {
      this.conjunto = Object.values(res.data)       
      }
      else if(this.n == 11) {
      this.all =   Object.values(res.data.all)
      this.paid =   Object.values(res.data.paid)
      this.cancel =   Object.values(res.data.cancel)
      this.conjunto = this.all
      console.log(res.data)
      }     
    
      if(this.isObjectEmpty(this.conjunto)) {
      this.vermensaje = true;
      this.verfiltros = false;
      }


         
        }
                      
      }
    )
  }


  async doRefresh(event: { target: { complete: () => void; }; }) {
   this.terms = ""
    this.user = JSON.parse(await this.localstorage.getData('usuario'))
  if(this.user){   
    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
    
    var url = 'https://washtt.com/v2_api_clientes_getipoappointment.php'
    var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email, n : this.n }
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
        
 if(this.n != 11) {
      this.conjunto = Object.values(res.data)       
      }
      else if(this.n == 11) {
      this.all =   Object.values(res.data.all)
      this.paid =   Object.values(res.data.paid)
      this.cancel =   Object.values(res.data.cancel)
      this.conjunto = this.all
      console.log(res.data)
      }     
    
      if(this.isObjectEmpty(this.conjunto)) {
      this.vermensaje = true;
      this.verfiltros = false;
      }
         
        }
                      
      }
    )
  }
  else {
    let mensaje = 'please login again'
    let header = 'Warning'
    let code = ''
   
    this.localstorage.clearData()
    this.router.navigate(['/login']);
    this.aviso(header, mensaje, code) 
   } 
}

goBack(): void {
   this.router.navigate(['/tabs/tabtobooks/tipocitas'])  
}

  async Cancelar(id: number): Promise<void> {
 
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
          this.router.navigate(['/tabs/tabtobooks/tipocitas']) 
          code = ''
          header = 'Warning' 
          mensaje = 'Appointment successfully cancelled'             
          this.aviso(header,mensaje,code)        
                    
              
        
          break;
          
     
         
        }
                      
      }
    ) }


  }


  async Archive(id: number): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AarchivarComponent
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {

   this.loading.simpleLoader()
     var url = 'https://washtt.com/v1_api_clientes_archivar_item_order.php'
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
          
          

          case '200_OK':

          code = ''
          header = 'Warning' 
          mensaje = 'Appointment successfully archived'             
          this.aviso(header,mensaje,code) 
          this.router.navigate(['/tabs/tabtobooks/tipocitas']) 
                    
              
        
          break;
          
     
         
        }
                      
      }
    ) 
}
    
  }

  async Pay1(service:string,subtotal:any,item_id:any, wash_id:any, descuento: any, total:any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PaysquareComponent,
       componentProps: { 
        
        concepto : service,
        subtotal : subtotal,
        descuento : descuento,
        total : total,
        item : item_id,
        wash : wash_id
        
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'continue') {
//refrescar luego del pago
switch(data.accion) {

case "alogin":
  this.router.navigate(['/tabs/tabtobooks/tipopagos'])  
break;    

case "tipopagos":
   this.router.navigate(['/tabs/tabtobooks/tipopagos'])  
break;

case "successpay":
  var url = 'https://washtt.com/v2_api_clientes_getipoappointment.php'
    var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email, n : this.n }
    this.cHttps(url, data1).subscribe(
      async (res: any) => {            
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

      if(this.n != 11) {
      this.conjunto = Object.values(res.data)       
      }
      else if(this.n == 11) {
      this.all =   Object.values(res.data.all)
      this.paid =   Object.values(res.data.paid)
      this.cancel =   Object.values(res.data.cancel)
      this.conjunto = this.all
      console.log(res.data)
      }     
    
      if(this.isObjectEmpty(this.conjunto)) {
      this.vermensaje = true;
      this.verfiltros = false;
      }
         
        }
                      
      }
    )
break; 

case "successpaycond":
  var url = 'https://washtt.com/v2_api_clientes_getipoappointment.php'
    var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email, n : this.n }
    this.cHttps(url, data1).subscribe(
      async (res: any) => {            
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

     if(this.n != 11) {
      this.conjunto = Object.values(res.data)       
      }
      else if(this.n == 11) {
      this.all =   Object.values(res.data.all)
      this.paid =   Object.values(res.data.paid)
      this.cancel =   Object.values(res.data.cancel)
      this.conjunto = this.all
      console.log(res.data)
      }     
    
      if(this.isObjectEmpty(this.conjunto)) {
      this.vermensaje = true;
      this.verfiltros = false;
      }
         
        }
                      
      }
    )
break;



}


    } 
  
  }

  async Pay2(service:string,subtotal:any,item_id:any, wash_id:any, descuento: any, total:any,recargo_monto:any, recargo_concepto:any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PaysquarechargeComponent,
       componentProps: { 
        
        concepto : service,
        subtotal : subtotal,
        descuento : descuento,
        total : total,
        item : item_id,
        wash : wash_id,
        recargo_concepto : recargo_concepto,
        recargo_monto : recargo_monto
        
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'continue') {
//refrescar luego del pago
switch(data.accion) {

case "alogin":
  this.router.navigate(['/tabs/tabtobooks/tipopagos'])  
break;    

case "tipopagos":
   this.router.navigate(['/tabs/tabtobooks/tipopagos'])  
break;

case "successpay":
  var url = 'https://washtt.com/v2_api_clientes_getipoappointment.php'
    var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email, n : this.n }
    this.cHttps(url, data1).subscribe(
      async (res: any) => {            
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

   
      if(this.n != 11) {
      this.conjunto = Object.values(res.data)       
      }
      else if(this.n == 11) {
      this.all =   Object.values(res.data.all)
      this.paid =   Object.values(res.data.paid)
      this.cancel =   Object.values(res.data.cancel)
      this.conjunto = this.all
      console.log(res.data)
      }     
    
      if(this.isObjectEmpty(this.conjunto)) {
      this.vermensaje = true;
      this.verfiltros = false;
      }
         
        }
                      
      }
    )
break; 

case "successpaycond":
  var url = 'https://washtt.com/v2_api_clientes_getipoappointment.php'
    var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email, n : this.n }
    this.cHttps(url, data1).subscribe(
      async (res: any) => {            
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

     

      if(this.n != 11) {
      this.conjunto = Object.values(res.data)       
      }
      else if(this.n == 11) {
      this.all =   Object.values(res.data.all)
      this.paid =   Object.values(res.data.paid)
      this.cancel =   Object.values(res.data.cancel)
      this.conjunto = this.all
      console.log(res.data)
      }     
    
      if(this.isObjectEmpty(this.conjunto)) {
      this.vermensaje = true;
      this.verfiltros = false;
      }
         
        }
                      
      }
    )
break;



}


    } 
  
  }

  async Galery(id: any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: SlidergaleryComponent,
      componentProps: { 
        item: id,
        
      }
    });
     modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'continue') {



    } 
  }





  vermobil(){
    this.terms = "Mobil"
  }
  veryard(){
    this.terms = "Yard"
  }

  verlistos() {
     this.conjunto = this.paid
  }

  vercancel() {
   this.conjunto = this.cancel
  }

 





}
