import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { ProfileComponent } from './profile/profile.component';
import { BilladdressComponent } from './billaddress/billaddress.component';
import { LocationsComponent } from './locations/locations.component';
import { FleetComponent  } from './fleet/fleet.component';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,

    children: [

      { path: 'nav-profile', component: ProfileComponent },
      { path: 'billaddress', component: BilladdressComponent },
      { path: 'locations', component: LocationsComponent },
      { path: 'fleet', component: FleetComponent }
      /*,      
     
     
      { path: 'account', component:AccountComponent },
      { path: 'addsitio', component:AddsiteComponent },
      { path: 'addcar', component:AddcarComponent },*/
     
      
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
