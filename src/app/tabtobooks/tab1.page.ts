import { Component } from '@angular/core';
import {AutenticacionService} from '../servicios/autenticacion'
import { Router } from "@angular/router";

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



  constructor(
private AutenticacionService : AutenticacionService,
private router: Router,

  ) {

this.cliente_correo= 'ejemplo@gmail.com'
this.autenticacion_tipo= 'correo_pass'
this.router.navigate(['/tabs/tabtobooks/tipovehiculos']);



    
      }



salida_regular() {
    
  this.AutenticacionService.logout_regular()
  
    }



}
