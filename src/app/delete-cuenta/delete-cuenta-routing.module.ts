import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteCuentaPage } from './delete-cuenta.page';
import { DeleteComponent } from './delete/delete.component';
import { EncuestaComponent } from './encuesta/encuesta.component';

const routes: Routes = [
  {
    path: '',
    component: DeleteCuentaPage,
     children: [
 
       { path: 'delete', component: DeleteComponent },
         { path: 'encuesta', component: EncuestaComponent },

  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],


})
export class DeleteCuentaPageRoutingModule {}
