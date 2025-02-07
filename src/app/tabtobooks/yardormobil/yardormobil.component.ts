import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Params } from '@angular/router';
import { Router } from '@angular/router';
import { StorageService } from '../../servicios/storage.service';
import {  ModalController, AlertController  } from '@ionic/angular';
import {CitamobilComponent} from '../citamobil/citamobil.component';
import {CitayardComponent} from '../citayard/citayard.component';
@Component({
  selector: 'app-yardormobil',
  templateUrl: './yardormobil.component.html',
  styleUrls: ['./yardormobil.component.scss'],
  standalone:false
})
export class YardormobilComponent  implements OnInit {
  user!:any
  washname! : string
  washlavado! : string
washvehiculo! : string 
  washid! : number;
  washprecio! : string
  washpreciomobil! : string
  precioyarda! :string
  preciomobils!:string
  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private localstorage: StorageService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {

    this.washname = this.rutaActiva.snapshot.params['servicio'];
    this.washlavado = this.rutaActiva.snapshot.params['vehiculo'];
   this.washvehiculo = this.rutaActiva.snapshot.params['washvehiculo'];
   
  this.washid = this.rutaActiva.snapshot.params['washid']
  this.washprecio = this.rutaActiva.snapshot.params['washprecio']
  this.washpreciomobil = this.rutaActiva.snapshot.params['washpreciomobil']
    this.rutaActiva.params.subscribe(
      async (params: Params) => {
        this.washname = params['servicio'];
        this.washlavado = params['vehiculo'];
      this.washvehiculo = params['washvehiculo'];

        this.washid = params['washid']
        this.washprecio = params['washprecio']
        this.washpreciomobil = params['washpreciomobil']
      
        
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





  async ionViewWillEnter() {
    const formatter$ = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    await this.localstorage.setData('vehiculo', this.washlavado)
    this.user = JSON.parse(await this.localstorage.getData('usuario'))

    if(this.user) {
     
      let precioyard = parseInt(this.washprecio) 
      let preciomobil = parseInt(this.washpreciomobil)
    this.precioyarda = formatter$.format(precioyard)
    this.preciomobils = formatter$.format(preciomobil)
      
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

  async yarda(){
    const modal = await this.modalCtrl.create({
      component: CitayardComponent
    });
    modal.present();
  
    const { data, role } = await modal.onWillDismiss();

    if (role === 'continue') {}

  }

  async mobil(){
    const modal = await this.modalCtrl.create({
      component: CitamobilComponent
    });
    modal.present();
  
    const { data, role } = await modal.onWillDismiss();
    if (role === 'continue') {}
  }

  cancel() {
    this.router.navigate(['/tabs/tabtobooks/tipovehiculos']);
  }

}
