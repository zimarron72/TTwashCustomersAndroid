import { Component } from '@angular/core';
import {AutenticacionService} from '../servicios/autenticacion'
import { Router } from "@angular/router";
import { StorageService } from '../servicios/storage.service';
@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    standalone: false
})
export class Tab1Page  {

 //activePageTitle = 'To book';

  Pages = [
    /*{
      title: 'Dashboard',
      url: '/pasos/wellcome',
      icon: 'speedometer'
    },*/
    {
      title: 'Truck and Trailer Appoinments',
      url: '/tabs/tabtobooks/tipocitas',
      icon: 'stop'
    },
     {
      title: 'Fleet Appoinments',
      url: '/tabs/tabtobooks/tipocitasfleets',
      icon: 'grid'
    },
      {
      title: "Other vehicles and service's appoinments",
      url: '/tabs/tabtobooks/tipocitasothers',
      icon: 'car-sport'
    },
    {
      title: 'Payments',
      url: '/tabs/tabtobooks/tipopagos',
      icon: 'card'
    },
    {
      title: 'Coupons',
      url: '/pasos/coupons',
      icon: 'gift'
    }
  ]; 

  autenticacion_tipo!: string
  cliente_correo!: string


user:any
  constructor(
private AutenticacionService : AutenticacionService,
private router: Router,
 private localstorage: StorageService,

  ) {

//viejo
//this.router.navigate(['/tabs/tabtobooks/tipovehiculos']);
        


    
      }

   wellcome(){
    window.location.assign('pasos/wellcome')
   }

   async ionViewWillEnter() {  
    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
  this.cliente_correo = this.user.email
  
  }

salida_regular() {
    
  this.AutenticacionService.logout_regular()
  
    }

    deleteCuenta(){
      this.router.navigate(['delete-cuenta/delete']);
    }

    logoutGoogle() {
      this.AutenticacionService.logoutGoogle()
    }  



}
