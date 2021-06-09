import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablePageComponent } from './table-page.component';
import { SharedModule } from '../../shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FlexModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    TablePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class TablePageModule {
}
