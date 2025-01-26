import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { ProfileComponent } from './profile/profile.component';
import { BilladdressComponent } from './billaddress/billaddress.component';
import { LocationsComponent } from './locations/locations.component';
import { FleetComponent  } from './fleet/fleet.component';
import { ModaladdsiteComponent  } from './modaladdsite/modaladdsite.component';
import { ModaladdtruckComponent  } from './modaladdtruck/modaladdtruck.component';
const routes: Routes = [
  {
    path: '',
    component: Tab2Page,

    children: [

      { path: 'nav-profile', component: ProfileComponent },
      { path: 'billaddress', component: BilladdressComponent },
      { path: 'locations', component: LocationsComponent },
      { path: 'fleet', component: FleetComponent },
      { path: 'addsitio', component:ModaladdsiteComponent },
      { path: 'addcar', component:ModaladdtruckComponent },
      /*,      
     
     
      { path: 'account', component:AccountComponent },
     
      { path: 'addcar', component:ModaladdtruckComponent },*/
     
      
    /* {
        path: '',
        redirectTo: '/tabs/tabprofile/nav-profile',
      },*/
      
     
    ],





  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
