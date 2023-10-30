import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSelection1Component } from './job-selection1/job-selection1.component';
import { SelectionPage2Component } from './selection-page2/selection-page2.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { HomeProfessionalComponent } from './home-professional/home-professional.component';
import { JobDetailsComponent } from './job-details/job-details.component';

const routes: Routes = [
  { path: 'home-client', component: HomeClientComponent },
  { path: 'home-professional', component: HomeProfessionalComponent },
  { path: 'selection1', component: JobSelection1Component },
  { path: 'selection2', component: SelectionPage2Component },
  { path: 'details', component: JobDetailsComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
