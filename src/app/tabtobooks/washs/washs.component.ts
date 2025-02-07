import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Params } from '@angular/router';
import { Router } from '@angular/router';
import { StorageService } from '../../servicios/storage.service';
import { LoadingService } from '../../servicios/loading.services';
@Component({
  selector: 'app-washs',
  templateUrl: './washs.component.html',
  styleUrls: ['./washs.component.scss'],
  standalone:false
})
export class WashsComponent  implements OnInit {

  washname! : string
 washlavado! : string
 washvehiculo! : string
 washdescripcion! : string
 washid! : number;
 washprecio! : string
 washpreciomobil! : string

  constructor(

    private router: Router,
    private rutaActiva: ActivatedRoute,   
    private localstorage: StorageService,
    private loading : LoadingService,


  ) {

    this.washname = this.rutaActiva.snapshot.params['washname'];
    this.washlavado = this.rutaActiva.snapshot.params['washlavado'];
    this.washvehiculo = this.rutaActiva.snapshot.params['washvehiculo'];
    this.washdescripcion = this.rutaActiva.snapshot.params['washdescripcion'];
  this.washid = this.rutaActiva.snapshot.params['washid']
  this.washprecio = this.rutaActiva.snapshot.params['washprecio']
  this.washpreciomobil = this.rutaActiva.snapshot.params['washpreciomobil']
    this.rutaActiva.params.subscribe(
      async (params: Params) => {
        this.washname = params['washname'];
        this.washlavado = params['washlavado'];
        this.washvehiculo = params['washvehiculo'];
        this.washdescripcion = params['washdescripcion'];
        this.washid = params['washid']
        this.washprecio = params['washprecio']
        this.washpreciomobil = params['washpreciomobil']
        await this.localstorage.setData('washpreciomobil', this.washpreciomobil)
        await this.localstorage.setData('washprecio', this.washprecio)
        await this.localstorage.setData('tipovehiculo', this.washlavado) 
     
        
      }
    );
  

   }

  ngOnInit() {}

  reservarnow() {
   
  }

  cancel() {
    this.router.navigate(['/tabs/tabtobooks/tipovehiculos']);
  }

}
