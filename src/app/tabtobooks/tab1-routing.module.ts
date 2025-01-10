import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import {TipovehiculosComponent} from './tipovehiculos/tipovehiculos.component';
import {CitasComponent} from './citas/citas.component';


const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  children: [
      
      { path: 'tipovehiculos', component: TipovehiculosComponent },
      { path: 'citas', component: CitasComponent },
   /* { path: 'tipolavados/:vehiculo/:vehiculoid', component: TipolavadosComponent },
      { path: 'tiposervicios/:vehiculo/:lavado/:lavadoid', component: TiposerviciosComponent },
      { path: 'washs/:washname/:washlavado/:washvehiculo/:washdescripcion/:washid/:washprecio/:washpreciomobil', component: WashsComponent },
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
