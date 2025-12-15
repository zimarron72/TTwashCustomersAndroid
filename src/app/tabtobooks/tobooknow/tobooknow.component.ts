import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute,  Params  } from '@angular/router';
import {  MenuController    } from '@ionic/angular';
@Component({
  selector: 'app-tobooknow',
  templateUrl: './tobooknow.component.html',
  styleUrls: ['./tobooknow.component.scss'],
  standalone:false
})
export class TobooknowComponent  implements OnInit {
modo:any
  constructor(
     private router: Router,
      private menuCtrl: MenuController,
          private rutaActiva: ActivatedRoute,
  ) { 

this.modo = this.rutaActiva.snapshot.params['modo'];
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.modo = params['modo'];    
      }
    );

    switch(this.modo){
   case 'menu':
this.menuCtrl.open('unico-menu');
break;
   case 'menuclose':
this.menuCtrl.close('unico-menu');
break;


  }
}

  ngOnInit() {}

bookNowTT() {
  this.router.navigate(['pasos/paso1']);   
}

bookNowOther() {
  this.router.navigate(['pasos/bookother']);   
}

bookNowFleets() {
  this.router.navigate(['pasos/bookfleets']);   
}

}
