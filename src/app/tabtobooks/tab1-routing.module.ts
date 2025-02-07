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



const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  children: [
      
      { path: 'tipovehiculos', component: TipovehiculosComponent },
      { path: 'citas', component: CitasComponent },
      { path: 'putprofile', component: PutprofileComponent },
      { path: 'tiposervicios/:vehiculo/:lavado/:lavadoid', component: TiposerviciosComponent },
      { path: 'tipolavados/:vehiculo/:vehiculoid', component: TipolavadosComponent },
      { path: 'washs/:washname/:washlavado/:washvehiculo/:washdescripcion/:washid/:washprecio/:washpreciomobil', component: WashsComponent },
      { path: 'yardormobil/:servicio/:vehiculo/:washid/:washprecio/:washpreciomobil', component:YardormobilComponent },
      { path: 'citamobil', component: CitamobilComponent },
      { path: 'citayarda', component: CitayardComponent },
    /*   
     
      { path: 'ingresarsitio', component: IngresarsitioComponent },
      { path: 'ingresarperfil', component: IngresarperfilComponent},
      { path: 'ingresarcamion', component: IngresarcamionComponent },
      { path: 'citamobil', component: CitamobilComponent },
      { path: 'citayarda', component: CitayardaComponent },
      { path: 'cart', component: CartComponent },
      { path: 'mybooks/:n', component: MybooksComponent },
      { path: 'mypays/:p', component: MypaysComponent },
      { path: 'tipopagos', component: TipopagosComponent },
      { path: 'tipobooks', component: TipobooksComponent},     
      { path: 'square/:servicio/:precio/:itemid/:wash_id/:descuento/:charge/:concepto:/:charge_status', component: SquareComponent},
      { path: 'successtobook', component: SuccesstobookComponent}, 
      { path: 'successpay', component: SuccesspayComponent}, 
      { path: 'dealsweek', component: DealsweekComponent},     
      { path: 'squareconcargo/:servicio/:precio/:itemid/:wash_id/:descuento/:charge/:concepto/:charge_status', component: SquareConcargoComponent},
      { path: 'galeria/:order_item_id', component: GaleriaComponent}, */



     /*{
        path: '',
        redirectTo: '/tabs/tabtobooks',
      },*/
    ]
  } /*,
  {
    path: '',
    redirectTo: '/tabs/tabtobooks',
  },*/

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
