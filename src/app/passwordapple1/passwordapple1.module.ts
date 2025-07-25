import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Passwordapple1PageRoutingModule } from './passwordapple1-routing.module';

import { Passwordapple1Page } from './passwordapple1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Passwordapple1PageRoutingModule
  ],
  declarations: [Passwordapple1Page]
})
export class Passwordapple1PageModule {}
