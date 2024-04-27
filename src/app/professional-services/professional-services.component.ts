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
interface Service {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-professional-services',
  templateUrl: './professional-services.component.html',
  styleUrls: ['./professional-services.component.css']
})
export class ProfessionalServicesComponent {
  serviciulSelectat: string = '';
  // serviciilePrimare: any;
  serviciilePrimare: Service[] = [
    { name: 'Serviciu 1', selected: false },
    { name: 'Serviciu 2', selected: false },
    { name: 'Serviciu 3', selected: false },
    // Add more services as needed
  ];


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firestore: Firestore,
    private serviceRequest: ServiceRequestInfoService
  ) {}

  ngOnInit() {
    this.getItems().subscribe((items) => {
      // this.serviciilePrimare = items;
    });
  }

  getItems(): Observable<any[]> {
    const collectionInstance = collection(this.firestore, 'servicii-de-baza');
    const filteredQuery = query(
      collectionInstance
    );

    // const filteredQuery = query(
    //   collectionInstance,
    //   where('serviciu', '==', this.serviciulSelectat)
    // );

    return collectionData(filteredQuery);
  }

  onServiceToggle(service: Service) {
    // No need to toggle, just update the selected state based on the checkbox value
    // service.selected = !service.selected;
  }

  backToHome() {
    this.router.navigate(['/home-client']);
  }

  salveazaProfesiile() {
    // Implement saving logic here
    console.log('Selected services:', this.serviciilePrimare.filter(service => service.selected));
  }
  
}
