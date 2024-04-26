import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  collection,
  collectionData,
  Firestore,
  query,
  where
} from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-jobs-portal',
  templateUrl: './jobs-portal.component.html',
  styleUrls: ['./jobs-portal.component.css'],
})
export class JobsPortalComponent {
  servicesRequestsCollection: any;
  servicesRequests: any;
  allServicesData: any;
  userId: any;

  constructor(private firestore: Firestore, private userService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user) => {
      this.userId = user;
      this.servicesRequestsCollection = collection(
        this.firestore,
        'serviceRequests'
      );
    
      this.servicesRequests = collectionData(
        query(
          this.servicesRequestsCollection,
          where('email', '==', this.userId.email)
        )
      ) as Observable<any[]>;
  
      // this.servicesRequests = collectionData(this.servicesRequestsCollection) as Observable<any[]>;
      this.servicesRequests.subscribe((data: any) => {
        this.allServicesData = data;
      });
    });

  }

  async aplica(serviciuComplet: any) {

    this.router.navigate(['/portal-service', serviciuComplet.identificatorUnic], { queryParams: { serviciuDinPortal: serviciuComplet } });

    // luam din db dupa id ul unic ??? sau cum puyrm face, cred ca doar asa

    // const taskCollection = collection(this.firestore, `serviceRequests`);
    // await addDoc(taskCollection, { ...this.allServicesData[0] });
  }
}
