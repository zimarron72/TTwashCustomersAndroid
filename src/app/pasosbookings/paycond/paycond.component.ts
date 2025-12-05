import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-paycond',
  templateUrl: './paycond.component.html',
  styleUrls: ['./paycond.component.scss'],
  standalone:false
})
export class PaycondComponent  implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

     otherPay() {
 this.router.navigate(['/tabs/tabtobooks/citas/7']);  
  }

  wellcome() {
   this.router.navigate(['/pasos/wellcome']);   
}

}
