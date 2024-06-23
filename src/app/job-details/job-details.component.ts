import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceRequestInfoService } from '../services/service-request-info.service'; // Serviciul pentru informațiile despre cererea de serviciu

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  textAreaValue: any; // Variabilă pentru a stoca valoarea introdusă în câmpul de text

  constructor(
    private router: Router, // instanta de Serviciu pentru gestionarea rutelor
    private serviceRequest: ServiceRequestInfoService // instanta de Serviciu pentru informațiile despre cererea de serviciu
  ) {
    this.textAreaValue = null; // Inițializăm valoarea câmpului de text cu null
  }

  ngOnInit() {}

  // Metoda pentru a continua la următoarea etapă

  continue() {
    if(this.textAreaValue){ // Verificăm dacă câmpul de text are o valoare
      // Dacă are valoare, actualizăm detaliile utilizatorului cu detaliile suplimentare introduse
      this.serviceRequest.updateUserDetails({
        detalii_suplimentare: this.textAreaValue,
      });
    }
    else {
      // Dacă nu are valoare, actualizăm detaliile utilizatorului cu un mesaj că nu există detalii suplimentare
      this.serviceRequest.updateUserDetails({
        detalii_suplimentare:"Nu există detalii suplimentare",
      });
    }
    // Redirecționăm către pagina de detalii a clientului
    this.router.navigate(['/client-details']);
  }

  // Metoda pentru a reveni înapoi la pagina anterioară
  back() {
    // Redirecționăm către pagina de detalii a locației și timpului
    this.router.navigate(['/location-time-details']);
  }
}
