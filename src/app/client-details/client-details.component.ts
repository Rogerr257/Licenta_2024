import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceRequestInfoService } from '../services/service-request-info.service';
import { AlertifyService } from '../services/alertify.service';

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

  constructor(
    // Injectăm serviciile necesare în constructor
    private router: Router, 
    private serviceRequest: ServiceRequestInfoService, 
    private alertifyService: AlertifyService
  ) {
    // Inițializăm obiectul detalii_client cu valori goale
    this.detalii_client = {
      nume: '',
      prenume: '',
      email: '',
      telefon: ''
    };
  }

  // Metoda pentru salvarea detaliilor clientului
  salveazaDetalii() {
    // Verificăm dacă toate câmpurile sunt completate
    if(this.detalii_client.nume && this.detalii_client.prenume && this.detalii_client.email && this.detalii_client.telefon){
      // Dacă sunt completate, actualizăm detaliile clientului folosind serviciul
      this.serviceRequest.updateUserDetails({
        nume: this.detalii_client.nume,
        prenume: this.detalii_client.prenume,
        email: this.detalii_client.email,
        telefon: this.detalii_client.telefon
      });

      // Redirectăm utilizatorul către pagina de detalii a cererii de serviciu
      this.router.navigate(['/service-request-details']);
    }
    else {
      // Dacă nu sunt completate, afișăm un mesaj de eroare
      this.alertifyService.error('Te rugăm să completezi toate câmpurile!'); 
    }   
  }


  back() {
    // Redirecționăm utilizatorul către pagina de detalii suplimentare
    this.router.navigate(['/additional-details']);
  }

}
