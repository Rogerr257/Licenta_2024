import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceRequestInfoService } from '../services/service-request-info.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent {
  detalii_client: {
    nume: string,
    prenume: string,
    email: string,
    telefon: string
  };

  constructor(private router: Router, private serviceRequest: ServiceRequestInfoService)
  {
      this.detalii_client = {
        nume: '',
        prenume: '',
        email: '',
        telefon: ''
      };
  }

  salveazaDetalii() {

    this.serviceRequest.updateUserDetails({
      nume: this.detalii_client.nume,
      prenume: this.detalii_client.prenume,
      email: this.detalii_client.email,
      telefon: this.detalii_client.telefon
    });

    this.router.navigate(['/service-request-details']);
  }

  back() {
    //se redirectioneaza userul la pagina anterioara
    this.router.navigate(['/additional-details']);
  }
}
