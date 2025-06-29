import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ServiceRequestInfoService } from '../services/service-request-info.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { SharedService } from '../services/shared.service';
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
  afisareMesajConectare = false;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private firestore: Firestore,
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
    this.serviciuPrincipal = serviciulSelectat.nume; 
    this.cerereDeServiciuInFormare.InformatiiPentruCerere = {
      serviciuPrincipal: this.serviciuPrincipal,
      mailClient: this.clientAplicatie.email,
    };
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
