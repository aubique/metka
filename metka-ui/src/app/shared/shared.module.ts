import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AgmCoreModule } from '@agm/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { MapComponent } from './components/map/map.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexModule,
    FlexLayoutModule,
    // Material
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatSelectModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatSnackBarModule,
    // 3rd-party
    FontAwesomeModule,
    AngularSvgIconModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: '',//TODO.sbdbd
    })], exports: [
    // Angular
    MapComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexModule,
    FlexLayoutModule,
    // Material
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatSelectModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatSnackBarModule,
    // 3d-party libs
    FontAwesomeModule,
    AngularSvgIconModule,
    AgmCoreModule,
    // Shared components
  ],
})
export class SharedModule {
}
