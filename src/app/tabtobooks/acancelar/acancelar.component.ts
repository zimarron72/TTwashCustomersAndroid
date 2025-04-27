import { Component, OnInit } from '@angular/core';
import {  AlertController , ModalController} from '@ionic/angular';

@Component({
  selector: 'app-acancelar',
  templateUrl: './acancelar.component.html',
  styleUrls: ['./acancelar.component.scss'],
  standalone:false
})
export class AcancelarComponent  implements OnInit {

  terminos: any

  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
   
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

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {

    if(this.terminos){
       this.modalCtrl.dismiss(this.terminos, 'confirm');
    }
    else {
      let code = ''
      let header = 'Waiting'
      let mensaje = 'You must accept the terms for final confirmation.'             
      this.aviso(header, mensaje, code) 
    }

   
  }

 


}
