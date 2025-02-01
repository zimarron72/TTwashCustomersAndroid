import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import { LoadingService } from '../../servicios/loading.services';
import { AlertController } from '@ionic/angular';





@Component({
  selector: 'app-tipolavados',
  templateUrl: './tipolavados.component.html',
  styleUrls: ['./tipolavados.component.scss'],
  standalone:false
})
export class TipolavadosComponent  implements OnInit {

  lavados!: any; 
  vehiculoid!: number;
  vehiculo!: string;
  user: any
  idtoken! : string
  autenticacion_tipo! : string
  token_notificacion! : string

  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private location: Location,
    private loading : LoadingService,
    private localstorage: StorageService,
    private alertController: AlertController
  ) { 
    this.vehiculoid = this.rutaActiva.snapshot.params['vehiculoid'];
    this.vehiculo = this.rutaActiva.snapshot.params['vehiculo'];
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.vehiculoid = params['vehiculoid'];
        this.vehiculo = params['vehiculo'];
      }
      )
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
    this.user = JSON.parse(await this.localstorage.getData('usuario'))

      if(this.user){    
      
        this.idtoken = await this.localstorage.getData('idtoken')
        this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
        this.loading.simpleLoader()
        var url = 'https://washtt.com/v1_api_clientes_tipodelavados.php'
        var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, id: this.vehiculoid }
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
                this.lavados = res.data      
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

  async doRefresh(event: { target: { complete: () => void; }; }) {
    if(this.user){    
      
      this.idtoken = await this.localstorage.getData('idtoken')
      this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
      this.loading.simpleLoader()
      var url = 'https://washtt.com/v1_api_clientes_tipodelavados.php'
      var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, id: this.vehiculoid }
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
              this.lavados = res.data      
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

  goBack(): void {
    this.location.back();
  }

}
