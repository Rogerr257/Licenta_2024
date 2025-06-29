import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; // ActivatedRoute pentru a accesa parametrii rutei
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore'; // Firestore pentru a accesa baza de date Firebase
import { Observable } from 'rxjs'; // Observable din RxJS pentru a gestiona fluxurile de date asincrone
import { ServiceRequestInfoService } from '../services/service-request-info.service'; // Serviciu pentru informațiile despre cererea de serviciu

@Component({
  selector: 'app-job-selection',
  templateUrl: './job-selection.component.html',
  styleUrls: ['./job-selection.component.css'],
})
export class JobSelectionComponent {
  serviciulSelectat: string = ''; // Variabilă pentru a stoca serviciul principal selectat
  serviciileSecundare: any; // Variabilă pentru a stoca serviciile secundare asociate cu serviciul principal selectat

  constructor(
    private router: Router, // instanta de Serviciu pentru gestionarea rutelor
    private activatedRoute: ActivatedRoute, // instanta de Serviciu pentru a accesa parametrii rutei
    private firestore: Firestore, // instanta de Firestore pentru a accesa baza de date Firebase
    private serviceRequest: ServiceRequestInfoService // instanta de Serviciu pentru informațiile despre cererea de serviciu
  ) {}

  ngOnInit() {
    // Obținem serviciul principal selectat din parametrii rutei
    const serviciuPrincipalName = this.activatedRoute.snapshot.queryParams['serviciulSelectat'];
    this.serviciulSelectat = serviciuPrincipalName;

    // Obținem serviciile secundare asociate cu serviciul principal selectat
    this.getItems().subscribe((items) => {
      this.serviciileSecundare = items
    });
  }

  // Metodă pentru a obține serviciile secundare asociate cu serviciul principal selectat
  getItems(): Observable<any[]> {
    const collectionInstance = collection(this.firestore, 'servicii-secundare'); 
    const filteredQuery = query(
      collectionInstance,
      where('serviciu', '==', this.serviciulSelectat)
    );
    return collectionData(filteredQuery); // Returnăm datele obținute sub formă de Observable
  }

  // Metodă apelată atunci când se face clic pe un serviciu secundar
  onItemClick(serviciulSelectat: { serviciu: string; serviciu_secundar: string }) {
    // Actualizăm detaliile utilizatorului cu serviciul secundar selectat
    this.serviceRequest.updateUserDetails({
      serviciu_secundar: serviciulSelectat.serviciu_secundar
    });
    // Redirecționăm către pagina de detalii a locației și timpului
    this.router.navigate(['/location-time-details'], {
      queryParams: { serviciulSelectat: serviciulSelectat.serviciu },
    });
  }

  // Metodă pentru a reveni la pagina de selecție a serviciilor
  backToHome() {
    this.router.navigate(['/home-client']); // Redirecționăm către pagina principală a clientului
  }
}
