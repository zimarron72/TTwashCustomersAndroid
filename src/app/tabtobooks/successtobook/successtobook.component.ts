import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-successtobook',
  templateUrl: './successtobook.component.html',
  styleUrls: ['./successtobook.component.scss'],
  standalone:false
})
export class SuccesstobookComponent  implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

wellcome() {
   this.router.navigate(['/pasos/wellcome']);   
}

}
