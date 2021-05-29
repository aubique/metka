import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HometagRoutingModule } from './hometag-routing.module';
import { HometagComponent } from './hometag.component';
import { SharedModule } from '../../shared/shared.module';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    HometagComponent,
    MapComponent,
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
