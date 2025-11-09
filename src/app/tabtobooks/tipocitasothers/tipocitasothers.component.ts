import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../servicios/storage.service';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import {  AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from '../../servicios/loading.services';

@Component({
  selector: 'app-tipocitasothers',
  templateUrl: './tipocitasothers.component.html',
  styleUrls: ['./tipocitasothers.component.scss'],
  standalone:false
})
export class TipocitasothersComponent  implements OnInit {

 inhold: any
  confirmed: any
  cancelled: any
  completed: any
  archivados: any
  pagados : any
  expirados: any

  idtoken!: string
  autenticacion_tipo!: string
  token_notificacion!: string
  user: any


  constructor(
    private localstorage: StorageService,
    private router: Router,
    private loading: LoadingService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {}

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
    var url = 'https://washtt.com/v2_api_clientes_getappointment.php'
    var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email }
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
            this.inhold = res.data.sinconfirmar
            this.confirmed = res.data.confirmados
            this.completed = res.data.completados
            this.cancelled = res.data.cancelados
            this.archivados = res.data.archivados
               this.pagados = res.data.pagados
               
           break;
         
        }
                      
      }
    )
  }


  async doRefresh(event: { target: { complete: () => void; }; }) {

    this.user = JSON.parse(await this.localstorage.getData('usuario'))
  if(this.user){   
    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
   
    var url = 'https://washtt.com/v2_api_clientes_getCitaOther.php'
    var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email }
    this.cHttps(url, data1).subscribe(
      async (res: any) => {
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
         
          case '200_OK':
            this.inhold = res.data.sinconfirmar
            this.confirmed = res.data.confirmados
            this.completed = res.data.completados
            this.cancelled = res.data.cancelados
            this.archivados = res.data.archivados
             this.pagados = res.data.pagados
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
