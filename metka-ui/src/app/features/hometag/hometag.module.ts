import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HometagRoutingModule } from './hometag-routing.module';
import { HometagComponent } from './hometag.component';


@NgModule({
  declarations: [
    HometagComponent
  ],
  imports: [
    CommonModule,
    HometagRoutingModule
  ]
})
export class HometagModule { }
