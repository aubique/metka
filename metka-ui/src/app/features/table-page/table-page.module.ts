import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablePageComponent } from './table-page.component';
import { TablePageRoutingModule } from './table-page-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../../shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    TablePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatRadioModule,
  ],
})
export class TablePageModule {
}
