import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';

import { RegistroPage } from './registro.page';

// Material angular

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RegistroPageRoutingModule,
    ExploreContainerComponentModule,
  ],
  declarations: [RegistroPage]
})
export class RegistroPageModule {}
