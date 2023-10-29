import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectionPage1Component } from './selection-page1/selection-page1.component';
import { SelectionPage2Component } from './selection-page2/selection-page2.component';
import { SelectionPage3Component } from './selection-page3/selection-page3.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'selection1', component: SelectionPage1Component },
  { path: 'selection2', component: SelectionPage2Component },
  { path: 'selection3', component: SelectionPage3Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
