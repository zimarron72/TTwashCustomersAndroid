import { Component, OnInit } from '@angular/core';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController  } from '@ionic/angular';
import { Router} from '@angular/router';
import { LoadingService } from '../../servicios/loading.services';



@Component({
  selector: 'app-modaladdsite',
  templateUrl: './modaladdsite.component.html',
  styleUrls: ['./modaladdsite.component.scss'],
  standalone:false
})
export class ModaladdsiteComponent  implements OnInit {


  constructor(
   private localstorage:StorageService, 
    private alertController: AlertController,
     private router: Router,
      private loading: LoadingService,
  ) {
   
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





  async ngOnInit() {
   
   

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






    
  }









