import { Component, OnInit } from '@angular/core';
import {    ModalController } from '@ionic/angular';
@Component({
  selector: 'app-cupon',
  templateUrl: './cupon.component.html',
  styleUrls: ['./cupon.component.scss'],
  standalone:false
})
export class CuponComponent  implements OnInit {
coupon:any
  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}


 
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  continue() {
    return this.modalCtrl.dismiss({
      coupon : this.coupon,
    
      },
       
       'continue');
  }

}
