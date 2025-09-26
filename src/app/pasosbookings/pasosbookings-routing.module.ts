import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasosbookingsPage } from './pasosbookings.page';
import { ComienzoComponent } from './comienzo/comienzo.component';
import { Paso1Component } from './paso1/paso1.component';
import { Paso2Component } from './paso2/paso2.component';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { PerfilmobilComponent } from './perfilmobil/perfilmobil.component';
import { SelectyardaComponent } from './selectyarda/selectyarda.component';

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
 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasosbookingsPageRoutingModule {}
