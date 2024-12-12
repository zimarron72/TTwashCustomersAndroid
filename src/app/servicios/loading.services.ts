import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class LoadingService {

  constructor(public loadingController: LoadingController) { }


  // Simple loader
  simpleLoader() {
    this.loadingController.create({
      message: 'One moment, please...',
      cssClass:'custom-loader-class',
      backdropDismiss: true
    }).then((response) => {
      response.present();
    });
  }

  // Dismiss loader
  dismissLoader() {
    this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
  }

   

}