import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HometagRoutingModule } from './hometag-routing.module';
import { HometagComponent } from './hometag.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    HometagComponent,
  ],
  imports: [
    CommonModule,
    HometagRoutingModule,
    SharedModule,
  ],
  exports: [],
})
export class HometagModule {
}
