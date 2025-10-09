import { Component, OnInit } from '@angular/core';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController  } from '@ionic/angular';
import { Router} from '@angular/router';

@Component({
  selector: 'app-booknowother',
  templateUrl: './booknowother.component.html',
  styleUrls: ['./booknowother.component.scss'],
  standalone:false
})
export class BooknowotherComponent  implements OnInit {

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
