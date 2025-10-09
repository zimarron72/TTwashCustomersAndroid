import { Component, OnInit } from '@angular/core';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController  } from '@ionic/angular';
import { Router,  ActivatedRoute, Params } from '@angular/router';
import { LoadingService } from '../../servicios/loading.services';
@Component({
  selector: 'app-paso2',
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.scss'],
  standalone:false
})
export class Paso2Component  implements OnInit {

 servicios!: any; 
 
  user: any
  idtoken! : string
  autenticacion_tipo! : string
  token_notificacion! : string
  id_category:any

  constructor(
     private localstorage:StorageService, 
    private alertController: AlertController,
     private router: Router,
      private loading: LoadingService,
         private rutaActiva: ActivatedRoute,
  ) {

  
  this.id_category = this.rutaActiva.snapshot.params['id_category'];
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.id_category = params['id_category'];        
      }
    );


   }

 


  ngOnInit() {}

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
  
    var url = 'https://washtt.com/v1_api_clientes_tipodeservicios.php'
    var data = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, id: this.id_category }
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
          case 'TOKEN ERROR':
          code = '01'
          header = 'Error' 
          mensaje = 'Invalid or expired token,please login again'
          this.localstorage.clearData()
          this.router.navigate(['/login'])   
          this.aviso(header,mensaje,code)                       
          break;            
         
          default:
            this.servicios = res.data
            console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKKK'+res.data)

        }
                      
      }
    )
    
    } 
    

     async doRefresh(event: { target: { complete: () => void; }; }) {
 event.target.complete();
 this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
     
    var url = 'https://washtt.com/v1_api_clientes_tipodeservicios.php'
    var data = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, id: this.id_category }
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
          case 'TOKEN ERROR':
          code = '01'
          header = 'Error' 
          mensaje = 'Invalid or expired token,please login again'
          this.localstorage.clearData()
          this.router.navigate(['/login'])   
          this.aviso(header,mensaje,code)                       
          break;            
         
          default:
            this.servicios = res.data
             console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKKK'+res.data)
        }
                      
      }
    )
     
     }


  async selectServiceMobil(name:any,image:any,precio:any,id:any) {

 const formatter$ = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

    let itemcartServicio = {
      servicio : name,
      image : image,
      servicioid : id,
      costo: precio,
      precio:formatter$.format(precio),
      
    }

 await this.localstorage.setObject('itemcartServicio',itemcartServicio)
this.router.navigate(['/pasos/selectlocation']); 

}

  async selectServiceOnsite(name:any,image:any,precio:any,id:any) {
   
     const formatter$ = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

    
   
  let itemcartServicio = {    
      servicio : name,
      image : image,
      servicioid : id,
      costo : precio,
      precio : formatter$.format(precio),
     
    }

 await this.localstorage.setObject('itemcartServicio', itemcartServicio)
this.router.navigate(['/pasos/selectyarda']);  
//this.router.navigate(['/pasos/map']);
}


  async atras() {
    this.router.navigate(['/pasos/paso1']);
   await this.localstorage.removeData('itemcartVehiculo1')
     await this.localstorage.removeData('itemcartServicio')
       await this.localstorage.removeData('itemcartOnsite')
         await this.localstorage.removeData('itemcartMobil')
           await this.localstorage.removeData('itemcartTime')
   
}

}
