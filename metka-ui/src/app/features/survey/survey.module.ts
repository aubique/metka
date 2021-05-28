import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    SurveyComponent,
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    SharedModule,
  ],
  exports: [],
})
export class SurveyModule {
}
