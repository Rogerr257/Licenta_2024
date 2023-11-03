import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent {

  constructor(private router: Router) {
  }

  continue() {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/location-time-details']);
  }

  back() {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/home-client']);
  }

}
