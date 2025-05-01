import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute,  Params } from '@angular/router';
import { Location } from '@angular/common';
import { StorageService } from '../../servicios/storage.service';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import {  AlertController ,  ModalController } from '@ionic/angular';
//import { LoadingService } from '../../servicios/loading.services';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';


register();

@Component({
  selector: 'app-slidergalery',
  templateUrl: './slidergalery.component.html',
  styleUrls: ['./slidergalery.component.scss'],
  standalone: false
})
export class SlidergaleryComponent  implements OnInit {

  item: any
  idtoken!: string
  autenticacion_tipo!: string
  token_notificacion!: string
  user: any
  imagenes: any

  



  constructor(
    private localstorage: StorageService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    //private loading: LoadingService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private location: Location,
  ) {
  /*  this.id = this.rutaActiva.snapshot.params['order_item_id'];
   
    this.rutaActiva.params.subscribe(

      (params: Params) => {
        
        this.id = params['order_item_id'];       
        
      }
    )*/
   }

  ngOnInit() {
    console.log('OJO' + this.item)
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
 
    if(this.user) {
      var url = 'https://washtt.com/v1_api_clientes_getfotosjob.php'
      var data1 = { idtoken : this.idtoken , autenticacion_tipo : this.autenticacion_tipo ,  id : this.item }
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
  
        this.imagenes = res.data
       console.log("veo "+this.imagenes)
           
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


  /*goBack(): void {
    this.router.navigate(['/tabs/tabtobooks/tipocitas']);
  }*/

    cancel() {
      return this.modalCtrl.dismiss(null, 'cancel');
    }
  
    continue() {
      return this.modalCtrl.dismiss(null, 'cancel');
    }


}
