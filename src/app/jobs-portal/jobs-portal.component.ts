import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {
  collection,
  collectionData,
  Firestore,
  query,
  where,
  addDoc
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

  constructor(private firestore: Firestore, private userService: AuthService) {}

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

  async applyForService() {
    // Implement your logic to open a popup and send an offer
    // You can use a library like Angular Material Dialog for the popup
    // You can also use Angular forms to get user input for the offer message
    // console.log('Applying for service:', service);

    const taskCollection = collection(this.firestore, `serviceRequests`);
    await addDoc(taskCollection, { ...this.allServicesData[0] });

  }
}
