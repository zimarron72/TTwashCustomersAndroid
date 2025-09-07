import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../../servicios/loading.services';
import {AutenticacionService} from '../../servicios/autenticacion'
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  standalone:false
})
export class DeleteComponent  implements OnInit {
toggleState: boolean = false;
user: any
idtoken!: string
autenticacion_tipo!: string
token_notificacion!: string
  constructor(
 private router: Router,  
    private loading: LoadingService,   
     private servicioauth : AutenticacionService,    
  ) { }

  ngOnInit() {}



 toggleChanged(event: any) {
    this.toggleState = event.target.checked;
}

  async continuar0() {

    this.loading.simpleLoader()
this.servicioauth.borrarCuenta().then(
  ()=> {
    this.loading.dismissLoader()

  }
)
}

async cancelar() {

  this.router.navigate(['/tabs/tabtobooks/tipovehiculos']);
}
}
