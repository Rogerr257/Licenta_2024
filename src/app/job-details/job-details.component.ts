import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit{
  textAreaValue: any;

  constructor(private router: Router) {
    this.textAreaValue = null;
  }

  ngOnInit() {
  }

  continue() {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/client-details']);
  }

  back() {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/location-time-details']);
  }

}