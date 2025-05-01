import { Component, OnInit } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { SquareService } from '../../servicios/square.service';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../servicios/storage.service';
import { LoadingService } from '../../servicios/loading.services';

declare var Square: any;
@Component({
  selector: 'app-paysquare',
  templateUrl: './paysquare.component.html',
  styleUrls: ['./paysquare.component.scss'],
  standalone : false
})
export class PaysquareComponent  implements OnInit {

  card: any 
servicio : any
precio : any
descuento : any
total : any
itemid : any
wash_id : any
email : any
precio_string! : string
descuento_string! : string
total_string! : string

charge! : string
concepto! : string

  constructor(
    private modalCtrl: ModalController,
    private dsls: SquareService, 
    private loading : LoadingService,
    private localstorage: StorageService,
    private alertController: AlertController

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

  async ionViewWillEnter() {

    this.loading.simpleLoader()
     //ojo square-sandbox or square segun las credenciales
     
    await this.dsls.loadScript('square-sandbox')
  //await this.dsls.loadScript('square')

  const formatter$ = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  this.total = parseFloat(this.precio) - parseFloat(this.descuento)

  this.precio_string =   formatter$.format(this.precio)
  this.descuento_string =   formatter$.format(this.descuento)
  this.total_string =   formatter$.format(this.total) 
  
  //async function main() {

const appId = 'sandbox-sq0idb-RrvT24qkMyTSr91-Qy080w';
// const appId = 'sq0idp-vuSagOWbgJlfqKv2PoID5A';
  const locationId = 'JCQ7Q20HXQTZ8';
 //const locationId = 'JCQ7Q20HXQTZ8';

// const payments = Square.payments(appId, locationId).setLocale('en-US');

const payments = Square.payments(appId, locationId)
    
const paymentsx = payments.setLocale('en-US');
  this.card = await payments.card();     

//  const router = this.router.navigate(['/tipopagos']);

await this.card.attach('#card-container')
this.loading.dismissLoader()




  }

  async ionViewDidLeave() {

    const destroyed = await this.card.destroy();
    (<HTMLInputElement>document.getElementById('payment-status-container')).innerText = '';
    (<HTMLInputElement>document.getElementById('payment-status-container')).innerText = '';

  }
 

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  continue() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
