import { Component, OnInit } from '@angular/core';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController  } from '@ionic/angular';
import { Router} from '@angular/router';
@Component({
  selector: 'app-booknowfleets',
  templateUrl: './booknowfleets.component.html',
  styleUrls: ['./booknowfleets.component.scss'],
  standalone:false
})
export class BooknowfleetsComponent  implements OnInit {

  constructor(
      private localstorage:StorageService, 
        private alertController: AlertController,
         private router: Router,
      
  ) { }

  ngOnInit() {}

  wellcome() {
   this.router.navigate(['/pasos/wellcome']);   
}

}
