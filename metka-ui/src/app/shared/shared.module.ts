import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
  declarations: [],
  imports: [
    // Angular
    FormsModule,
    CommonModule,
    // 3rd-party
    FontAwesomeModule,
    AngularSvgIconModule.forRoot(),
  ], exports: [
    // Angular
    FormsModule,
    // 3d-party libs
    FontAwesomeModule,
    AngularSvgIconModule,
  ],
})
export class SharedModule {
}
