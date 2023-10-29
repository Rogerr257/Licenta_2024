import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './home/home.component';
import { SelectionPage1Component } from './selection-page1/selection-page1.component';
import { SelectionPage2Component } from './selection-page2/selection-page2.component';
import { SelectionPage3Component } from './selection-page3/selection-page3.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SelectionPage1Component,
    SelectionPage2Component,
    SelectionPage3Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
