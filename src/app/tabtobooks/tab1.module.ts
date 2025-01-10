import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
//import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { RouterModule} from '@angular/router';
import { Tab1PageRoutingModule } from './tab1-routing.module';


//componentes anidados
import {TipovehiculosComponent} from './tipovehiculos/tipovehiculos.component';
import {CitasComponent} from './citas/citas.component';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    //ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    RouterModule,
  ],
  declarations: [
    Tab1Page,
    TipovehiculosComponent,
    CitasComponent
  ]
})
export class Tab1PageModule {}
