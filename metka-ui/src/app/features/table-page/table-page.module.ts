import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablePageComponent } from './table-page.component';
import { TablePageRoutingModule } from './table-page-routing.module';


@NgModule({
  declarations: [
    TablePageComponent,
  ],
  imports: [
    CommonModule,
    TablePageRoutingModule,
  ],
})
export class TablePageModule {
}
