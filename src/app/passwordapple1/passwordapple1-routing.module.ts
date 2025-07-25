import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Passwordapple1Page } from './passwordapple1.page';

const routes: Routes = [
  {
    path: '',
    component: Passwordapple1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Passwordapple1PageRoutingModule {}
