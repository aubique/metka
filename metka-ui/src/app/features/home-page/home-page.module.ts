import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageComponent } from './home-page.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [],
})
export class HomePageModule {
}
