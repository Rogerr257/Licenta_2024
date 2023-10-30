import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';


import { JobSelection1Component } from './job-selection1/job-selection1.component';
import { SelectionPage2Component } from './selection-page2/selection-page2.component';
import { HomeProfessionalComponent } from './home-professional/home-professional.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { JobsPortalComponent } from './jobs-portal/jobs-portal.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ClientDetailsComponent } from './client-details/client-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeProfessionalComponent,
    HomeClientComponent,
    JobSelection1Component,
    SelectionPage2Component,
    JobsPortalComponent,
    JobDetailsComponent,
    ClientDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
