import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ResetpasswordPageRoutingModule } from './resetpassword-routing.module';

import { ResetpasswordPage } from './resetpassword.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ResetpasswordPageRoutingModule,
    ExploreContainerComponentModule,
  ],
  declarations: [ResetpasswordPage]
})
export class ResetpasswordPageModule {}
