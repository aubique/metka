import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageComponent } from './home-page.component';
import { SharedModule } from '../../shared/shared.module';
import { MapComponent } from '../../shared/components/map/map.component';
import { SurveyComponent } from './survey/survey.component';
import { HomePageRoutingModule } from './home-page-routing.module';


@NgModule({
  declarations: [
    HomePageComponent,
    SurveyComponent,
  ],
  imports: [
    HomePageRoutingModule,
    CommonModule,
    SharedModule,
  ],
  exports: [],
})
export class HomePageModule {
}
