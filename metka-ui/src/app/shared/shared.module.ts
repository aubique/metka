import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [],
  imports: [
    // Angular
    FormsModule,
    CommonModule,
    // 3rd-party
    FontAwesomeModule,
    AngularSvgIconModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyByf9KyDr1TBS4fcEjJyeUatCs1TPKstgk',
    })], exports: [
    // Angular
    FormsModule,
    // 3d-party libs
    FontAwesomeModule,
    AngularSvgIconModule,
    AgmCoreModule,
  ],
})
export class SharedModule {
}
