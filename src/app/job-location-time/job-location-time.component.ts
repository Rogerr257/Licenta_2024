import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';
import { ServiceRequestInfoService } from '../services/service-request-info.service';

@Component({
  selector: 'app-job-location-time',
  templateUrl: './job-location-time.component.html',
  styleUrls: ['./job-location-time.component.css'],
})
export class JobLocationTimeComponent implements OnInit {
  judete: any = [];
  oraseleFiltrate: any = [];

  dataLucrarii: any;
  judetSelectat: string;
  orasSelectat: string;
  dataSelectata: string;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private firebaseService: FirebaseService,
    private serviceRequest: ServiceRequestInfoService
  ) {
    this.judetSelectat = '';
    this.orasSelectat = '';
    this.dataSelectata = '';
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    const colectieJudete = collection(this.firestore, 'judete');
    this.judete = collectionData(colectieJudete);
  }

  onJudetChange(event: any) {
    const colectieDeOrase = collection(this.firestore, 'orase');

    collectionData(colectieDeOrase).subscribe((toateOrasele: any[]) => {
      this.oraseleFiltrate = toateOrasele.filter(
        (item: any) => item.judet === event.value
      );
    });
    this.judetSelectat = event.value;
  }

  onOrasChange(event: any) {
    const orasSelectat = event.value;
    this.orasSelectat = orasSelectat;
  }

  onDatePickerChange(event: any) {
    const date = event.value;
    const dateString = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    this.dataSelectata = dateString;
  }

  continue() {
    this.serviceRequest.updateUserDetails({
      judetSelectat: this.judetSelectat,
      orasSelectat: this.orasSelectat,
      dataSelectata: this.dataSelectata,
    });

    // this.firebaseService.submitRequest(this.serviceRequest.InformatiiPentruCerere);
    this.router.navigate(['/additional-details']);
  }
  back() {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/home-client']);
  }
}
