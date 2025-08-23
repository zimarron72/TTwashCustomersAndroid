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
    {
      title: 'To book',
      url: '/tabs/tabtobooks/tipovehiculos',
      icon: 'calendar-clear'
    },

    {
      title: 'Appointments',
      url: '/tabs/tabtobooks/tipocitas',
      icon: 'calendar'
    },
    {
      title: 'Cart',
      url: '/tabs/tabtobooks/cart',
      icon: 'cart'
    },
    {
      title: 'Payments',
      url: '/tabs/tabtobooks/tipopagos',
      icon: 'card'
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


this.router.navigate(['/tabs/tabtobooks/tipovehiculos']);
        


    
      }

   async ionViewWillEnter() {  
    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
  this.cliente_correo = this.user.email
  
  }

salida_regular() {
    
  this.AutenticacionService.logout_regular()
  
    }



}
