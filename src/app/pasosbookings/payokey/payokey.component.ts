import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payokey',
  templateUrl: './payokey.component.html',
  styleUrls: ['./payokey.component.scss'],
  standalone:false
})
export class PayokeyComponent  implements OnInit {

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
