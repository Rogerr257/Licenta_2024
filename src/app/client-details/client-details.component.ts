import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceRequestInfoService } from '../services/service-request-info.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent {
  detalii_client: any;

  constructor(private router: Router,
    private serviceRequest: ServiceRequestInfoService){

      this.detalii_client = null;
    }

  continue() {

    this.serviceRequest.updateUserDetails({
      detalii_client: this.detalii_client
    });


    //se redirectioneaza userul la pagina cu informatiile personale ale clientului care se completeaza in cerere
    this.router.navigate(['/client-details']);
  }

  back() {
    //se redirectioneaza userul la pagina anterioara
    this.router.navigate(['/additional-details']);
  }
}
