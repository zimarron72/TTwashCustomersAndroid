import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { RouterModule } from '@angular/router';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SquareService } from '../servicios/square.service';


//componentes anidados
import { TipovehiculosComponent } from './tipovehiculos/tipovehiculos.component';
import { CitasComponent } from './citas/citas.component';
import { PutprofileComponent } from './putprofile/putprofile.component';
import { TiposerviciosComponent } from './tiposervicios/tiposervicios.component';
import { TipolavadosComponent } from './tipolavados/tipolavados.component';
import { WashsComponent } from './washs/washs.component';
import { YardormobilComponent } from './yardormobil/yardormobil.component';
import { CitamobilComponent } from './citamobil/citamobil.component';
import { CitayardComponent } from './citayard/citayard.component';
import { AddcarComponent } from './addcar/addcar.component';
import { AddsiteComponent } from './addsite/addsite.component';
import { CartComponent } from './cart/cart.component';
import { CuponComponent } from './cupon/cupon.component';
import { SuccesstobookComponent } from './successtobook/successtobook.component';
import { TipocitasComponent } from './tipocitas/tipocitas.component';
import { AcancelarComponent } from './acancelar/acancelar.component';
import { AarchivarComponent } from './aarchivar/aarchivar.component';
import { SortcitasPipe } from './sortcitas/sortcitas.pipe';
import { SlidergaleryComponent } from './slidergalery/slidergalery.component';
import { PaysquareComponent } from './paysquare/paysquare.component';
import { PaysquarechargeComponent } from './paysquarecharge/paysquarecharge.component';
import { TipopagosComponent} from './tipopagos/tipopagos.component';
import { PaymentsComponent} from './payments/payments.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TipocitasfleetsComponent } from './tipocitasfleets/tipocitasfleets.component';
import { TipocitasothersComponent } from './tipocitasothers/tipocitasothers.component';
import { AllcitasComponent } from './allcitas/allcitas.component';
import { CitasfleetComponent } from './citasfleet/citasfleet.component';
import { CitasotherComponent } from './citasother/citasother.component';
import { TobooknowComponent } from './tobooknow/tobooknow.component';
import { A2waitingComponent } from './a2waiting/a2waiting.component';
import { A2confirmedComponent } from './a2confirmed/a2confirmed.component';
import { A2attendedComponent } from './a2attended/a2attended.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,   
    Tab1PageRoutingModule,
    RouterModule,
  ],
  declarations: [
    Tab1Page,
    TipovehiculosComponent,
    CitasComponent,
     CitasfleetComponent,
      CitasotherComponent,
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
    SuccesstobookComponent,
    TipocitasComponent,
    AcancelarComponent,
    AarchivarComponent,
    SortcitasPipe,
    SlidergaleryComponent,
    PaysquareComponent,
    PaysquarechargeComponent,
    TipopagosComponent,
     PaymentsComponent,
     TipocitasfleetsComponent,
     TipocitasothersComponent,
     AllcitasComponent,
     TobooknowComponent,
     A2attendedComponent,
     A2confirmedComponent,
     A2waitingComponent
    
     

  ],
  providers: [SquareService],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA],

})
export class Tab1PageModule { }
