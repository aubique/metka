import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HometagComponent } from './hometag.component';

const routes: Routes = [
  {
    path: '',
    component: HometagComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HometagRoutingModule {
}
