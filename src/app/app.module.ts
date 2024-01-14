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
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
 
import { JobSelectionComponent } from './job-selection/job-selection.component';
import { HomeProfessionalComponent } from './home-professional/home-professional.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { JobsPortalComponent } from './jobs-portal/jobs-portal.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { JobLocationTimeComponent } from './job-location-time/job-location-time.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from './environments/environment';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeProfessionalComponent,
    HomeClientComponent,
    JobSelectionComponent,
    JobsPortalComponent,
    JobDetailsComponent,
    ClientDetailsComponent,
    JobLocationTimeComponent,
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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
