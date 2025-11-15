import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import {TipovehiculosComponent} from './tipovehiculos/tipovehiculos.component';
import {CitasComponent} from './citas/citas.component';
import {PutprofileComponent} from './putprofile/putprofile.component';
import {TiposerviciosComponent} from './tiposervicios/tiposervicios.component';
import {TipolavadosComponent} from './tipolavados/tipolavados.component';
import {WashsComponent} from './washs/washs.component';
import {YardormobilComponent} from './yardormobil/yardormobil.component';
import {CitamobilComponent} from './citamobil/citamobil.component';
import {CitayardComponent} from './citayard/citayard.component';
import {AddcarComponent} from './addcar/addcar.component';
import {AddsiteComponent} from './addsite/addsite.component';
import {CartComponent } from './cart/cart.component';
import {CuponComponent } from './cupon/cupon.component';
import {SuccesstobookComponent } from './successtobook/successtobook.component';
import {TipocitasComponent } from './tipocitas/tipocitas.component';
import {AcancelarComponent } from './acancelar/acancelar.component';
import {AarchivarComponent } from './aarchivar/aarchivar.component';
import { SlidergaleryComponent } from './slidergalery/slidergalery.component';
import { PaysquareComponent } from './paysquare/paysquare.component';
import { TipopagosComponent} from './tipopagos/tipopagos.component';
import { PaymentsComponent} from './payments/payments.component';
import { TipocitasfleetsComponent } from './tipocitasfleets/tipocitasfleets.component';
import { TipocitasothersComponent } from './tipocitasothers/tipocitasothers.component';
import { AllcitasComponent } from './allcitas/allcitas.component';




const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  children: [
      
      { path: 'tipovehiculos/:modo', component: TipovehiculosComponent },
      { path: 'citas/:n', component: CitasComponent },
      { path: 'payments/:n', component: PaymentsComponent },
      { path: 'putprofile', component: PutprofileComponent },
      { path: 'tiposervicios/:vehiculo/:lavado/:lavadoid', component: TiposerviciosComponent },
      { path: 'tipolavados/:vehiculo/:vehiculoid', component: TipolavadosComponent },
      { path: 'washs/:washname/:washlavado/:washvehiculo/:washdescripcion/:washid/:washprecio/:washpreciomobil', component: WashsComponent },
      { path: 'yardormobil/:servicio/:vehiculo/:washid/:washprecio/:washpreciomobil', component:YardormobilComponent },
      { path: 'citamobil', component: CitamobilComponent },
      { path: 'citayarda', component: CitayardComponent },
      { path: 'addcar/:modo', component: AddcarComponent },
      { path: 'addsite', component: AddsiteComponent },
      { path: 'cart', component: CartComponent },
      { path: 'cupon', component: CuponComponent },
      { path: 'successtobook', component: SuccesstobookComponent },
      { path: 'tipocitas', component: TipocitasComponent },
      { path: 'tipocitasfleets', component: TipocitasfleetsComponent },
      { path: 'tipocitasothers', component: TipocitasothersComponent },
      { path: 'tipopagos', component: TipopagosComponent },
      { path: 'cancelarcita', component: AcancelarComponent },
      { path: 'archivarcita', component: AarchivarComponent},
      { path: 'viewphoto/:order_item_id', component: SlidergaleryComponent },
      { path: 'Pay1', component: PaysquareComponent },
      { path: 'allcitas', component: AllcitasComponent },
   
      
    
    ]
  } 


  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
