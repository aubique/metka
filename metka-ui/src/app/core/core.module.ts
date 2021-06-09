import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { throwIfAlreadyLoaded } from './services/module-import.guard';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        MatToolbarModule,
    ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'Core Module');
  }
}
