import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSelection1Component } from './job-selection1/job-selection1.component';
import { SelectionPage2Component } from './selection-page2/selection-page2.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'selection1', component: JobSelection1Component },
  { path: 'selection2', component: SelectionPage2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
