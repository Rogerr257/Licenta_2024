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
import { AdminPageComponent } from './admin-page/admin-page.component';

import {
  AuthGuard,
  redirectUnauthorizedTo,
  hasCustomClaim,
} from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/home-client']);
const adminOnly = () => hasCustomClaim('admin');

const routes: Routes = [
  { path: '', redirectTo: '/home-client', pathMatch: 'full' },
  { path: 'home-client', component: HomeClientComponent },
  {
    path: 'selection',
    component: JobSelectionComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    // data: { authGuardPipe: adminOnly  }
  },
  {
    path: 'additional-details',
    component: JobDetailsComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'location-time-details',
    component: JobLocationTimeComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'client-details',
    component: ClientDetailsComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'portal',
    component: JobsPortalComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'jobs-portal-details/:identificatorUnic',
    component: PortalServiceComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'service-request-details',
    component: ServiceRequestDetailsComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'profesiile-mele',
    component: ProfessionalServicesComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'admin-page',
    component: AdminPageComponent,
    // canActivate: [AuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
