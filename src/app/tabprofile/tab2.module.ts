import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
//import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { RouterModule} from '@angular/router';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { BilladdressComponent } from './billaddress/billaddress.component';
import { LocationsComponent } from './locations/locations.component';
import { FleetComponent  } from './fleet/fleet.component';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    //ExploreContainerComponentModule,
    ReactiveFormsModule,
    Tab2PageRoutingModule,
    RouterModule,
  ],
  declarations: [Tab2Page,
    ProfileComponent,
    BilladdressComponent,
    LocationsComponent,
    FleetComponent
  ]
})
export class Tab2PageModule {}
