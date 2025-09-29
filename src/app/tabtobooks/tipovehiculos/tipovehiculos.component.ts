import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import { LoadingService } from '../../servicios/loading.services';
import { AlertController,  MenuController    } from '@ionic/angular';

interface Vehiculos {
  [index: number]: Vehiculo

}

interface Vehiculo {

  category_id: number;
  name: string;
  category_image: string;
  ordering: number;
}

@Component({
  selector: 'app-tipovehiculos',
  templateUrl: './tipovehiculos.component.html',
  styleUrls: ['./tipovehiculos.component.scss'],
  standalone: false
})
export class TipovehiculosComponent implements OnInit {

  modo:any

  vehiculos: any;
  user: any
  vehicle: any

  idtoken!: string
  autenticacion_tipo!: string
  token_notificacion!: string

  dummyList: any[] = [];

  constructor(
    private router: Router,
    private loading: LoadingService,
    private localstorage: StorageService,
    private alertController: AlertController,
    private menuCtrl: MenuController,
     private rutaActiva: ActivatedRoute,
  ) {

  this.modo = this.rutaActiva.snapshot.params['modo'];
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.modo = params['modo'];    
      }
    );

    switch(this.modo){
   case 'more':
this.menuCtrl.open('unico-menu');
   break; 
  case 'verprecio':
//NADA
   break;    

    }

    
  }

  


  async ngOnInit() { 
    

  }


   async ionViewWillEnter() {  
   
    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
    this.loading.simpleLoader()
    var url = 'https://washtt.com/v1_api_clientes_tipodevehiculos.php'
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
        /*  case 'PERFIL_INCOMPLETO': viejo
          this.router.navigate(['/tabs/tabtobooks/putprofile']);
          break; */
          case 'CONTINUAR':
            this.vehiculos = res.data  
              console.log(this.vehiculos)            
           break;
          default:
            this.vehiculos = res.data  
            console.log(this.vehiculos) 
        }
                      
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


            doRefresh(event: { target: { complete: () => void; }; }) {
              event.target.complete();
             
            
              var url = 'https://washtt.com/v1_api_clientes_tipodevehiculos.php'
              var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email }
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
                    case 'PERFIL_INCOMPLETO':
                     this.router.navigate(['/tabs/tabtobooks/putprofile']);
                    break; 
                    case 'CONTINUAR':
                      this.vehiculos = res.data  
                        console.log(this.vehiculos) 
                     
                     break;
                    default:
                      this.vehiculos = res.data  
                      console.log(this.vehiculos) 
                  }
                                
                }
              )

            }  

 





        }
