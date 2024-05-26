import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore,
  collection,
  doc,
  getDocs,
  deleteDoc
} from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertifyService } from '../services/alertify.service';

interface DocumentWithId {
  id: string;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent {
  serviciiDisponibile: any;

  constructor(private firestore: Firestore,  private alertifyService: AlertifyService) {}

  ngOnInit() {
    this.getItems().subscribe((items) => {
      this.serviciiDisponibile = items;
    });
  }

  getItems(): Observable<any[]> {
    const collectionInstance = collection(this.firestore, 'cereriDeServicii');

    return from(getDocs(collectionInstance)).pipe(
      map((querySnapshot: any) => {
        const documents: DocumentWithId[] = [];
  
        querySnapshot.forEach((doc: any) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
  
        return documents;
      })
    );
  }

  /*
  Metoda stergeOferta este marcată ca async pentru a putea utiliza sintaxa await, ceea
  ce face ca apelul către deleteDoc să fie asincron, iar codul să aștepte finalizarea
  acestei operațiuni înainte de a trecela următoarea linie. Acest lucru este important 
  pentru a gestiona operațiunile asincrone într-un mod mai lizibil și pentru a permite
  utilizarea blocurilor try...catch pentru a gestiona erorile.
  */
  async stergeOferta(service: any) {
    try {
      const documentReference = doc(this.firestore, `cereriDeServicii/${service.id}`);
      await deleteDoc(documentReference);
      
      this.alertifyService.success('Cererea a fost ștearsă cu succes!');
      // Reîmprospătează lista de servicii disponibile după ștergere
      this.getItems().subscribe((items) => {
        this.serviciiDisponibile = items;
      });
    } catch (error) {
      console.error('Eroare la ștergerea documentului: ', error);
    }
  }

}
