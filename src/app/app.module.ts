import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';;
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { JobSelectionComponent } from './job-selection/job-selection.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { JobsPortalComponent } from './jobs-portal/jobs-portal.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { JobLocationTimeComponent } from './job-location-time/job-location-time.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { ServiceRequestDetailsComponent } from './service-request-details/service-request-details.component';
import { PortalServiceComponent } from './jobs-portal-details/jobs-portal-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeClientComponent,
    JobSelectionComponent,
    JobsPortalComponent,
    JobDetailsComponent,
    ClientDetailsComponent,
    JobLocationTimeComponent,
    ServiceRequestDetailsComponent,
    PortalServiceComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    AuthService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
