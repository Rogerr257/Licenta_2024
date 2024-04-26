import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';
import { ServiceRequestInfoService } from '../services/service-request-info.service';
import { EmailService } from '../services/email.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-service-request-details',
  templateUrl: './service-request-details.component.html',
  styleUrls: ['./service-request-details.component.css']
})
export class ServiceRequestDetailsComponent implements OnInit {
  name: any;
  email: any;
  message: any;
  cerereDeServiciuComplet: any;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private firebaseService: FirebaseService,
    private cerereDeServiciuInFormare: ServiceRequestInfoService,
    private emailService: EmailService
  ) {}

  ngOnInit() {
    this.cerereDeServiciuComplet = this.cerereDeServiciuInFormare.InformatiiPentruCerere;
  }

  salveazaCerereaInBazaDeDate() {
    this.firebaseService.submitRequest({
      identificatorUnic: uuidv4(),
       ...this.cerereDeServiciuComplet
       }
     );
  }

  trimiteMailCuCererea() {
    this.emailService.sendEmail(this.cerereDeServiciuComplet);

    // trimitem mail la toti profesionistii
    const profesionisti: any = []; // filtrati dupa meserie
    for (const profesionist of profesionisti) {

      const data = Object.assign(this.cerereDeServiciuComplet, {
        email: profesionist.email
      });
      this.emailService.sendEmail(data);
    }

    this.router.navigate(['/home-client']);
  }

  trimiteCerereaSiSalveaza() {

    this.salveazaCerereaInBazaDeDate();
    this.trimiteMailCuCererea();
  }


  back() {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/home-client']);
  }

}
