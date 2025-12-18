import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasosbookingsPage } from './pasosbookings.page';
import { ComienzoComponent } from './comienzo/comienzo.component';
import { Paso1Component } from './paso1/paso1.component';
import { Paso2Component } from './paso2/paso2.component';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { PerfilmobilComponent } from './perfilmobil/perfilmobil.component';
import { SelectyardaComponent } from './selectyarda/selectyarda.component';
import { MapComponent } from './map/map.component';
import { SelectcitaComponent } from './selectcita/selectcita.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SelectlocationComponent } from './selectlocation/selectlocation.component';

import { BooknowotherComponent } from './booknowother/booknowother.component';
import { BooknowfleetsComponent } from './booknowfleets/booknowfleets.component';
import { CartComponent } from './cart/cart.component';
import { PayokeyComponent } from './payokey/payokey.component';
import { PaycondComponent } from './paycond/paycond.component';
import { AddfleetComponent } from './addfleet/addfleet.component';
import { AddlocationComponent } from './addlocation/addlocation.component';
import { FleetComponent } from './fleet/fleet.component';
import { LocationsComponent } from './locations/locations.component';
import { CouponsComponent } from './coupons/coupons.component';



const routes: Routes = [
  {
    path: '',
    component: PasosbookingsPage,
    children: [
{ path: 'wellcome', component: WellcomeComponent },  
{ path: 'comienzo', component: ComienzoComponent },
 { path: 'paso1', component: Paso1Component },
 { path: 'paso2/:id_category', component: Paso2Component },
 { path: 'perfilFaltante', component: PerfilmobilComponent },
  { path: 'selectyarda', component: SelectyardaComponent },
    { path: 'map/:lat/:lng/:direccion/:yard_nombre', component: MapComponent },
    { path: 'selectcita', component: SelectcitaComponent },
      { path: 'checkout', component: CheckoutComponent },
    { path: 'selectlocation', component: SelectlocationComponent },      
 
   { path: 'bookother', component: BooknowotherComponent },
     { path: 'bookfleets', component: BooknowfleetsComponent },
      { path: 'cart', component: CartComponent },
       { path: 'pagoexitoso', component: PayokeyComponent },
        { path: 'pagocond', component: PaycondComponent },
        { path: 'addFleet', component: AddfleetComponent },
         { path: 'addLocations', component: AddlocationComponent },

           { path: 'fleet', component: FleetComponent },
            { path: 'locations', component: LocationsComponent },
              { path: 'coupons', component: CouponsComponent },
           


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasosbookingsPageRoutingModule {}
