import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSelectionComponent } from './job-selection/job-selection.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { JobLocationTimeComponent } from './job-location-time/job-location-time.component';
import { JobsPortalComponent } from './jobs-portal/jobs-portal.component';
import { ServiceRequestDetailsComponent } from './service-request-details/service-request-details.component';
import { PortalServiceComponent } from './jobs-portal-details/jobs-portal-details.component';
import { ProfessionalServicesComponent } from './professional-services/professional-services.component';

const routes: Routes = [
  { path: '', redirectTo: '/home-client', pathMatch: 'full' },
  { path: 'home-client', component: HomeClientComponent },
  { path: 'selection', component: JobSelectionComponent },
  { path: 'additional-details', component: JobDetailsComponent },
  { path: 'location-time-details', component: JobLocationTimeComponent },
  { path: 'client-details', component: ClientDetailsComponent },
  { path: 'portal', component: JobsPortalComponent },
  { path: 'jobs-portal-details/:identificatorUnic', component: PortalServiceComponent },
  { path: 'service-request-details', component: ServiceRequestDetailsComponent },
  { path: 'profesiile-mele', component: ProfessionalServicesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
