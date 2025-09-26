import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PasosbookingsPageRoutingModule } from './pasosbookings-routing.module';
import { PasosbookingsPage } from './pasosbookings.page';
import { ComienzoComponent } from './comienzo/comienzo.component';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { Paso1Component } from './paso1/paso1.component';
import { Paso2Component } from './paso2/paso2.component';
import { PerfilmobilComponent } from './perfilmobil/perfilmobil.component';
import { SelectyardaComponent } from './selectyarda/selectyarda.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasosbookingsPageRoutingModule
  ],
  declarations: [PasosbookingsPage,
    ComienzoComponent,
    WellcomeComponent,
    Paso1Component,
    Paso2Component,
    PerfilmobilComponent,
    SelectyardaComponent
  ]
})
export class PasosbookingsPageModule {}
