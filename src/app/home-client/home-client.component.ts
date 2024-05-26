import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ServiceRequestInfoService } from '../services/service-request-info.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';
import { collection, Firestore, collectionData, orderBy, query } from '@angular/fire/firestore';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css'],
})
export class HomeClientComponent {
  serviciiPrimare: any;
  serviciuPrincipal: any;
  clientAplicatie: any;
  afisareMesajConectare = true;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private authService: AuthService,
    private cerereDeServiciuInFormare: ServiceRequestInfoService,
    private afAuth: AngularFireAuth,
    private sharedService: SharedService
  ) {
    this.subscription = this.sharedService.buttonVisible$.subscribe(
      (visible) => {
        this.afisareMesajConectare = visible;
      }
    );
  }

  ngOnInit() {
    this.getData(); // Apelăm metoda pentru a obține datele
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.clientAplicatie = user; // Obținem informațiile despre clientul conectat
      }
    });
  }

  onItemClick(serviciulSelectat: any) {
    this.serviciuPrincipal = serviciulSelectat.nume; // Setăm serviciul principal selectat

    // Actualizăm informațiile cererii de serviciu cu serviciul principal și email-ul clientului
    this.cerereDeServiciuInFormare.InformatiiPentruCerere = {
      serviciuPrincipal: this.serviciuPrincipal,
      mailClient: this.clientAplicatie.email,
    };

    // Redirecționăm către pagina de selecție cu parametrii necesari
    this.router.navigate(['/selection'], {
      queryParams: { serviciulSelectat: serviciulSelectat.nume },
    });
  }


  getData() {
    const collectionInstance = collection(this.firestore, 'servicii-de-baza'); // Obținem colecția din Firestore
    const orderedCollection = query(collectionInstance, orderBy('nume')); // Ordonăm colecția după nume
    this.serviciiPrimare = collectionData(orderedCollection); // Obținem datele colecției
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
