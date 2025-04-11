import { Component, OnInit } from '@angular/core';
import {   AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-cupon',
  templateUrl: './cupon.component.html',
  styleUrls: ['./cupon.component.scss'],
  standalone:false
})
export class CuponComponent  implements OnInit {


  array = {
    cupon: "",  
  }



  constructor(
    private modalCtrl: ModalController,
     private alertController: AlertController,
  ) { }


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

  validateForm(){
    var code
    var header
    var mensaje
    var allValidationFlag = true


    if (this.array.cupon == "") {
      allValidationFlag = false ;     
        code = ''
              header = 'Waiting'
              mensaje = 'Your Coupon must be filled out'             
              this.aviso(header, mensaje, code)      
    }


    return (allValidationFlag) ? true : false ;    

  }

 
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  continue() {
    
    if(this.validateForm()){
   this.modalCtrl.dismiss({
      coupon : this.array.cupon,
    
      },
       
       'continue');
  }
}


}
