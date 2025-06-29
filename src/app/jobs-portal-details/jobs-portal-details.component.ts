import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  collection,
  collectionData,
  Firestore,
  query,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-jobs-portal-details',
  templateUrl: './jobs-portal-details.component.html',
  styleUrls: ['./jobs-portal-details.component.css']
})
export class PortalServiceComponent {
  cerereDeServiciuComplet: any;
  identificatorUnic: any; 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    const identificatorUnic = this.activatedRoute.snapshot.queryParams['identificatorUnic'];
    this.identificatorUnic = identificatorUnic;

    this.getItems().subscribe((items: any) => {
      this.cerereDeServiciuComplet = items[0];
    });  
  }

  getItems(): Observable<any[]> {
    const collectionInstance = collection(
      this.firestore,
      'cereriDeServicii'
    );
    const filteredQuery = query(
      collectionInstance,
      where('identificatorUnic', '==', this.identificatorUnic)
    );
    return collectionData(filteredQuery);
  }
  
  navigateBack() {
    this.router.navigate(['/portal']);
  }
}
