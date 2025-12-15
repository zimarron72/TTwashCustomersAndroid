import { Component, OnInit } from '@angular/core';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController } from '@ionic/angular';
import { Router   } from '@angular/router';
//import {AutenticacionService} from '../../servicios/autenticacion'
@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.scss'],
  standalone:false
})
export class WellcomeComponent  implements OnInit {

  user: any
  idtoken: any
  autenticacion_tipo:any
  fleet:any
  sinconfirmar:any
  confirmados:any
   completados:any
  locations:any
  coupons:any

  constructor(
     private localstorage:StorageService, 
    private alertController: AlertController,
     private router: Router,

      //   private AutenticacionService : AutenticacionService,
    
  ) { }

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

   var url = 'https://washtt.com/v2_api_clientes_get_wellcome.php'
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

               case 'PERFIL_INCOMPLETO':          
            this.router.navigate(['/pasos/perfilFaltante'])                    
            break;

                 case 'NOT_FLEET':          
            this.router.navigate(['/pasos/comienzo'])                    
            break;
           
            
        
          default:
            this.fleet= res.data.fleet
            this.locations = res.data.locations
            this.sinconfirmar = res.data.sinconfirmar
            this.confirmados = res.data.confirmados
            this.completados = res.data.completados
            this.coupons = res.data.coupons

            console.log('xxxxxxxxxx'+res.data.fleet + res.data.locations + res.data.bookings) 
        }
                      
      }
    )

        
  }

       doRefresh(event: { target: { complete: () => void; }; }) {
              event.target.complete();
            
         var url = 'https://washtt.com/v2_api_clientes_get_wellcome.php'
    var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email }
    this.cHttps(url, data1).subscribe(
      async (res: any) => {
       
   
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
        
          default:
           this.fleet= res.data.fleet
            this.locations = res.data.locations
            this.sinconfirmar = res.data.sinconfirmar
            this.confirmados = res.data.confirmados
            this.completados = res.data.completados
            this.coupons = res.data.coupons
            console.log('xxxxxxxxxx'+res.data.fleet + res.data.locations + res.data.bookings) 
        }
                      
      }
    )     
            
            
            
            }

 /* salir() {
 this.AutenticacionService.logout_regular()
}*/

bookNowTT() {
  this.router.navigate(['pasos/paso1']);   
}

bookNowOther() {
  this.router.navigate(['pasos/bookother']);   
}

bookNowFleets() {
  this.router.navigate(['pasos/bookfleets']);   
}

bookCheck() {
    this.router.navigate(['/tabs/tabtobooks/allcitas']);  
}



/*findMore() {
this.router.navigate(['/tabs/tabtobooks/tipovehiculos/more']);
}*/

menu() {
 //this.router.navigate(['/tabs/tabtobooks/tipovehiculos/more']); 
 this.router.navigate(['/tabs/tabtobooks/tobooknow/menu']); 
}

Buscar(){}

verSin(){
  if(this.sinconfirmar != 0) {
this.router.navigate(['/tabs/tabtobooks/citas/1']);  
  }
  else {
     let mensaje
        let header
        let code
         code = ''
            header = ''
            mensaje = 'Currently, there are no reservations awaiting confirmation.'       
            this.aviso(header, mensaje, code)  
  }
   
}

verCon(){
    if(this.confirmados != 0) {
this.router.navigate(['/tabs/tabtobooks/citas/2']);  
  }
  else {
     let mensaje
        let header
        let code
         code = ''
            header = ''
            mensaje = 'It currently has no confirmed reservations.'       
            this.aviso(header, mensaje, code)  
  }
}

verPay(){
     if(this.completados != 0) {
this.router.navigate(['/tabs/tabtobooks/citas/7']);  
  }
  else {
     let mensaje
        let header
        let code
         code = ''
            header = ''
            mensaje = 'Currently, there are no reservations pending payment.'       
            this.aviso(header, mensaje, code)  
  }
}

verSite(){
     if(this.locations != 0) {
this.router.navigate(['/pasos/locations']);  
  }
  else {
  this.router.navigate(['/pasos/addLocation']);  
  }
}

verFleet(){
     if(this.fleet != 0) {
this.router.navigate(['/pasos/fleet']);  
  }
  else {
  this.router.navigate(['/pasos/addFleet']);  
  }
}

verCoupons() {
  if(this.coupons != 0) {
this.router.navigate(['/pasos/coupons']);  
  }
  else {
   let mensaje
        let header
        let code
         code = ''
            header = ''
            mensaje = 'Currently, there are no Coupons Active.'       
            this.aviso(header, mensaje, code)  
  }
}
 
}
