import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceRequestInfoService } from '../services/service-request-info.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  textAreaValue: any;

  constructor(
    private router: Router,
    private serviceRequest: ServiceRequestInfoService
  ) {
    this.textAreaValue = null;
  }

  ngOnInit() {}

  continue() {
    this.serviceRequest.updateUserDetails({
      detalii_suplimentare: this.textAreaValue,
    });

    this.router.navigate(['/client-details']);
  }

  back() {
    this.router.navigate(['/location-time-details']);
  }
}
