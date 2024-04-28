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
  serviciulSelectat: string = '';
  serviciilePrimare: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firestore: Firestore,
    private serviceRequest: ServiceRequestInfoService
  ) {}

  ngOnInit() {
    const serviciuPrincipalName = this.activatedRoute.snapshot.queryParams['serviciulSelectat'];
    this.serviciulSelectat = serviciuPrincipalName;

    this.getItems().subscribe((items) => {
      this.serviciilePrimare = items;
    });
  }

  getItems(): Observable<any[]> {
    const collectionInstance = collection(this.firestore, 'servicii-secundare');
    const filteredQuery = query(
      collectionInstance,
      where('serviciu', '==', this.serviciulSelectat)
    );

    return collectionData(filteredQuery);
  }

  onItemClick(serviciulSelectat: { serviciu: string; serviciu_secundar: string }) {

    this.serviceRequest.updateUserDetails({
      serviciu_secundar: serviciulSelectat.serviciu_secundar
    });

    this.router.navigate(['/location-time-details'], {
      queryParams: { serviciulSelectat: serviciulSelectat.serviciu },
    });
  }

  backToHome() {
    this.router.navigate(['/home-client']);
  }
}
