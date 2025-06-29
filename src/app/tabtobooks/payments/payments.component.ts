import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../servicios/storage.service';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import {  AlertController  } from '@ionic/angular';
import { Router, ActivatedRoute,  Params} from '@angular/router';
import { LoadingService } from '../../servicios/loading.services';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  standalone: false
})
export class PaymentsComponent  implements OnInit {
n!: string

idtoken!: string
  autenticacion_tipo!: string
  token_notificacion!: string
  user: any
vermensaje:boolean= false

  conjunto:any

  colorp!: string
colorpx!: string

  constructor(
      private localstorage: StorageService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private loading: LoadingService,
    private alertController: AlertController,
   

  ) 
  { 

this.n = this.rutaActiva.snapshot.params['n'];
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.n = params['n'];    
      }
    );

switch(this.n) {  
  case 'Denied':
  this.colorp = "#ffc409"
  this.colorpx = "rgb(36, 42, 49)"
  break
  case 'Processed':
  this.colorp = "#42d77d"
  this.colorpx = "rgb(36, 42, 49)"
  break  
  default:
   this.colorp = ""
   this.colorpx = ""
  break
  
  }

  }

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

  async ionViewWillEnter() {





    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
    this.loading.simpleLoader()
    var url = 'https://washtt.com/v1_api_clientes_gettipopaysclientes.php'
    var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email, p : this.n }
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


      var sinfiltrardatos = Object.values(res.data)
      this.conjunto = sinfiltrardatos
    
if(this.isObjectEmpty(this.conjunto)) {
this.vermensaje = true;

}
    
         
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
    
    var url = 'https://washtt.com/v1_api_clientes_gettipopaysclientes.php'
    var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email, p : this.n }
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

      

      var sinfiltrardatos = Object.values(res.data)
      this.conjunto = sinfiltrardatos

    if(this.isObjectEmpty(this.conjunto)) {
this.vermensaje = true;

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
  this.router.navigate(['/tabs/tabtobooks/tipopagos']) 
}

}
