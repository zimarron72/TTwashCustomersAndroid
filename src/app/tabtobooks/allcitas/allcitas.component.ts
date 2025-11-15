import { Component, OnInit } from '@angular/core';
import { Router   } from '@angular/router';
@Component({
  selector: 'app-allcitas',
  templateUrl: './allcitas.component.html',
  styleUrls: ['./allcitas.component.scss'],
  standalone:false
})
export class AllcitasComponent  implements OnInit {

  constructor(
      private router: Router,
  ) { }

  ngOnInit() {}

  regresar() {
     this.router.navigate(['/pasos/wellcome']);  
  }

  bookNowTT() {
  this.router.navigate(['tabs/tabtobooks/tipocitas']);   
}

bookNowOther() {
  this.router.navigate(['tabs/tabtobooks/tipocitasothers']);   
}

bookNowFleets() {
  this.router.navigate(['tabs/tabtobooks/tipocitasfleets']);   
}

}
