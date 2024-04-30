import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
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
  serviciiFiltrate: any;
  userId: any;

  constructor(
    private firestore: Firestore,
    private userService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user) => {
      this.userId = user;
      this.servicesRequestsCollection = collection(
        this.firestore,
        'cereriDeServicii'
      );

      this.servicesRequests = collectionData(
        this.servicesRequestsCollection
      ) as Observable<any[]>;
      this.servicesRequests.subscribe((data: any[]) => {
        this.allServicesData = data;

        // Once you have received data from the first collection, fetch data from the second collection
        const meseriiProfesionistiCollection = collection(
          this.firestore,
          'meseriiProfesionisti'
        );

        const meseriiProfesionistiData = collectionData(
          meseriiProfesionistiCollection
        ) as Observable<any[]>;
        meseriiProfesionistiData.subscribe((meseriiData: any[]) => {
          // Now you have data from both collections, you can compare and save as needed
          this.serviciiFiltrate = this.filterData(
            this.allServicesData,
            meseriiData
          );
         // console.log(this.serviciiFiltrate);
          //console.log(this.userId.email);
        });
      });
    });
  }

  filterData(data1: any[], data2: any[]): any[] {
    // Filter data1 based on the condition described
    const filteredData = data1.filter((item1) => {
      // Find corresponding item in data2 where serviciu matches serviciuPrincipal and selected is true
      const matchingItem = data2.find(
        (item2) =>
          item2.serviciu === item1.serviciuPrincipal &&
          item2.selectate === true &&
          this.userId.email === item2.email
      );
      // Return true if matchingItem exists
      return !!matchingItem;
    });
    return filteredData;
  }

  async veziDetaliicOportunitate(serviciuComplet: any) {
    this.router.navigate(['/jobs-portal-details', serviciuComplet.identificatorUnic], {
      queryParams: { identificatorUnic: serviciuComplet.identificatorUnic },
    });
  }
}
