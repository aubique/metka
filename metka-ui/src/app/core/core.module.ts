import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { throwIfAlreadyLoaded } from './services/module-import.guard';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  exports: [
    HeaderComponent,
  ],
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'Core Module');
  }
}
