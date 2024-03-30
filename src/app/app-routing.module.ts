import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSelectionComponent } from './job-selection/job-selection.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { HomeProfessionalComponent } from './home-professional/home-professional.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { JobLocationTimeComponent } from './job-location-time/job-location-time.component';
import { JobsPortalComponent } from './jobs-portal/jobs-portal.component';
import { ServiceRequestDetailsComponent } from './service-request-details/service-request-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home-client', pathMatch: 'full' },
  { path: 'home-client', component: HomeClientComponent },
  { path: 'home-professional', component: HomeProfessionalComponent },
  { path: 'selection', component: JobSelectionComponent },
  { path: 'additional-details', component: JobDetailsComponent },
  { path: 'location-time-details', component: JobLocationTimeComponent },
  { path: 'client-details', component: ClientDetailsComponent },
  { path: 'portal', component: JobsPortalComponent },
  // { path: 'portal-service-details/:id', component: JobsPortalComponent },
  { path: 'service-request-details', component: ServiceRequestDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
