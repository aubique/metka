import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { SharedModule } from '../../shared/shared.module';
import { MapComponent } from './map/map.component';
import { SurveyComponent } from './survey/survey.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    HomePageComponent,
    MapComponent,
    SurveyComponent,
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ],
  exports: [],
})
export class HomePageModule {
}
