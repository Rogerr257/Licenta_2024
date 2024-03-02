import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData}  from '@angular/fire/firestore';

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

  constructor(private router: Router, private firestore: Firestore) {
    this.judetSelectat = ''; // Initialize the property with an empty string.
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

   collectionData(colectieDeOrase)
    .subscribe((toateOrasele: any[]) =>
      {
        this.oraseleFiltrate = toateOrasele.filter(
        (item: any) => item.judet === event.value)
      }
    );

    console.log(this.oraseleFiltrate);
    this.judetSelectat = event.value;
  }

  onOrasChange(event: any) {
    const orasSelectat =  event.value;
    this.orasSelectat = orasSelectat;
  }

  onDatePickerChange(event: any) {
    const date = event.value;
    const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    this.dataSelectata = dateString;
  }


  continue() {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/additional-details'])

  }
  back() {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/home-client']);
  }
}
