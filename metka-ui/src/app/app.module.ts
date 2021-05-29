import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomePageModule } from './features/home-page/home-page.module';
import { TablePageModule } from './features/table-page/table-page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Angular
    BrowserModule,
    AppRoutingModule,
    // Features
    HomePageModule,
    TablePageModule,
    // Core & Shared
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      // Display custom icons for Stepper
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
