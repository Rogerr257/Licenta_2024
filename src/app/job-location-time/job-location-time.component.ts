import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData, orderBy, query } from '@angular/fire/firestore'; // Firestore pentru a accesa baza de date Firebase
import { ServiceRequestInfoService } from '../services/service-request-info.service'; // Serviciu pentru informațiile despre cererea de serviciu

@Component({
  selector: 'app-job-location-time',
  templateUrl: './job-location-time.component.html',
  styleUrls: ['./job-location-time.component.css'],
})
export class JobLocationTimeComponent implements OnInit {
  judete: any = []; // Variabilă pentru a stoca județele
  oraseleFiltrate: any = []; // Variabilă pentru a stoca orașele filtrate în funcție de județ

  dataLucrarii: any; // Variabilă pentru data lucrării
  judetSelectat: string; // Variabilă pentru județul selectat
  orasSelectat: string; // Variabilă pentru orașul selectat
  dataSelectata: string; // Variabilă pentru data selectată

  constructor(
    private router: Router, // instanta de Serviciu pentru gestionarea rutelor
    private firestore: Firestore, // instanta de Firestore pentru a accesa baza de date Firebase
    private serviceRequest: ServiceRequestInfoService // instanta de Serviciu pentru informațiile despre cererea de serviciu
  ) {
    this.judetSelectat = ''; // Inițializăm județul selectat cu un string gol
    this.orasSelectat = ''; // Inițializăm orașul selectat cu un string gol
    this.dataSelectata = ''; // Inițializăm data selectată cu un string gol
  }

  ngOnInit() {
    this.getData(); // Apelăm metoda pentru a obține datele inițiale
  }

  // Metodă pentru a obține datele inițiale
  getData() {
    const colectieJudete = collection(this.firestore, 'judete'); // Obținem colecția de județe din Firestore
    const colectieJudeteOrdonate = query(colectieJudete, orderBy('nume')); // Ordonăm colecția de județe după nume
    this.judete = collectionData(colectieJudeteOrdonate); // Obținem datele județelor
  }

  // Metodă apelată atunci când se schimbă județul selectat
  onJudetChange(event: any) {
    const colectieDeOrase = collection(this.firestore, 'orase'); // Obținem colecția de orașe din Firestore

    // Filtrăm orașele în funcție de județul selectat
    collectionData(colectieDeOrase).subscribe((toateOrasele: any[]) => {
      this.oraseleFiltrate = toateOrasele.filter(
        (item: any) => item.judet === event.value
      );
    });

    this.judetSelectat = event.value; // Actualizăm județul selectat
  }

  // Metodă apelată atunci când se schimbă orașul selectat
  onOrasChange(event: any) {
    const orasSelectat = event.value; // Obținem orașul selectat
    this.orasSelectat = orasSelectat; // Actualizăm orașul selectat
  }

  // Metodă apelată atunci când se schimbă data selectată
  onDatePickerChange(event: any) {
    const date = event.value; // Obținem data selectată
    const dateString = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`; // Formatăm data ca șir de caractere
    this.dataSelectata = dateString; // Actualizăm data selectată
  }


  // Metodă pentru a continua la următoarea etapă
  continue() {
    // Actualizăm detaliile utilizatorului cu județul, orașul și data selectate
    this.serviceRequest.updateUserDetails({
      judetSelectat: this.judetSelectat,
      orasSelectat: this.orasSelectat,
      dataSelectata: this.dataSelectata,
    });

    // Redirecționăm către pagina de detalii suplimentare
    this.router.navigate(['/additional-details']);
  }

  // Metodă pentru a reveni înapoi la pagina anterioară
  back() {
    // Redirecționăm către pagina de selecție a cererii pentru client
    this.router.navigate(['/home-client']);
  }

}
