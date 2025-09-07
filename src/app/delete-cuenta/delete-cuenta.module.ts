import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteCuentaPageRoutingModule } from './delete-cuenta-routing.module';

import { DeleteCuentaPage } from './delete-cuenta.page';

import { DeleteComponent } from './delete/delete.component';
import { EncuestaComponent } from './encuesta/encuesta.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteCuentaPageRoutingModule
  ],
  declarations: [DeleteCuentaPage, DeleteComponent, EncuestaComponent]
})
export class DeleteCuentaPageModule {}
