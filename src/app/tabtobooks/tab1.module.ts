import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
//import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { RouterModule} from '@angular/router';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ServiciosTobook} from '../servicios/servicios.tobook';

//componentes anidados
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
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    RouterModule,
  ],
  declarations: [
    Tab1Page,
    TipovehiculosComponent,
    CitasComponent,
    PutprofileComponent,
    TiposerviciosComponent,
    TipolavadosComponent,
    WashsComponent,
    YardormobilComponent,
    CitamobilComponent,
    CitayardComponent,
    AddcarComponent,
    AddsiteComponent,
    CartComponent,
    CuponComponent,
    SuccesstobookComponent
    



  ],
  providers: [ServiciosTobook,],
})
export class Tab1PageModule {}
