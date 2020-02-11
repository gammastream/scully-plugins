import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ScullyLibModule,
    RouterModule.forRoot([{
      path: 'a',
      component: AppComponent
    }, {
      path: 'b',
      component: AppComponent
    }, {
      path: 'c',
      component: AppComponent
    }, {
      path: '',
      component: AppComponent
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
