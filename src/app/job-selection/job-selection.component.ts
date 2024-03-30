import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ServiceRequestInfoService } from '../services/service-request-info.service';

@Component({
  selector: 'app-job-selection',
  templateUrl: './job-selection.component.html',
  styleUrls: ['./job-selection.component.css'],
})
export class JobSelectionComponent {
  item: string = '';
  selections: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firestore: Firestore,
    private serviceRequest: ServiceRequestInfoService
  ) {}

  ngOnInit() {
    const mainServiceName = this.activatedRoute.snapshot.queryParams['item'];
    this.item = mainServiceName;

    // ne subscriem la observabil pentru a lua datele din el
    this.getItems().subscribe((items) => {
      this.selections = items;
    });
  }

  //se preia elementele din baza de date folosind observables
  getItems(): Observable<any[]> {
    const collectionInstance = collection(this.firestore, 'servicii-secundare');
    const filteredQuery = query(
      collectionInstance,
      where('serviciu', '==', this.item)
    );

    return collectionData(filteredQuery);
  }

  onItemClick(item: { serviciu: string; serviciu_secundar: string }) {

    this.serviceRequest.updateUserDetails({
      serviciu_secundar: item.serviciu_secundar
    });

    this.router.navigate(['/location-time-details'], {
      queryParams: { item: item.serviciu },
    });
  }

  backToHome() {
    this.router.navigate(['/home-client']);
  }
}
