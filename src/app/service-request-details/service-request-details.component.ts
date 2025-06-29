import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';
import { ServiceRequestInfoService } from '../services/service-request-info.service';
import { EmailService } from '../services/email.service';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-service-request-details',
  templateUrl: './service-request-details.component.html',
  styleUrls: ['./service-request-details.component.css'],
})
export class ServiceRequestDetailsComponent implements OnInit {
  cerereDeServiciuCompletInFormare: any;
  mailClient: any;
  serviciuPrincipal: any;
  potriviri: any;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private firebaseService: FirebaseService,
    private cerereDeServiciuInFormare: ServiceRequestInfoService,
    private emailService: EmailService,
    private alertifyService: AlertifyService
  ) {}

  
  ngOnInit() {
    this.cerereDeServiciuCompletInFormare = this.cerereDeServiciuInFormare.InformatiiPentruCerere;
    this.mailClient = this.cerereDeServiciuInFormare.InformatiiPentruCerere.mailClient;
    this.serviciuPrincipal = this.cerereDeServiciuInFormare.InformatiiPentruCerere.serviciuPrincipal;

    const meseriiProfesionistiReferintaColectie = collection(
      this.firestore,
      'meseriiProfesionisti'
    );

    const meseriileProfesionistilor = collectionData(meseriiProfesionistiReferintaColectie) as Observable<any[]>;
    meseriileProfesionistilor.subscribe((meserii: any) => {
      
        this.potriviri = meserii.filter((meserie: any) =>
        meserie.serviciu === this.serviciuPrincipal &&
        meserie.selectate === true 
      );
    });

  }

  salveazaCerereaInBazaDeDate() {
    this.firebaseService.submitRequest({
      identificatorUnic: uuidv4(),
      ...this.cerereDeServiciuCompletInFormare,
    });
  }

  trimiteMailuriCuCererea() {
    this.emailService
      .sendEmail({
        scopMail: 'confirmare Client',
        personToEmail: this.mailClient,
        ...this.cerereDeServiciuCompletInFormare,
      })
      .subscribe(
        () => {
          console.log('Confirmation Email sent successfully!');
        },
        (error) => {
          console.log('Error sending Confirmation Email:', error);
        }
      );

    for (const meserias of this.potriviri) {
      this.emailService.sendEmail(
        {
          scopMail: 'Trimitere mail la meserias',
          personToEmail: meserias.email,
          ...this.cerereDeServiciuCompletInFormare,
        }
      ).subscribe(
        () => {
          console.log('Email to Meserias sent successfully!');
        },
        (error) => {
          console.log('Error sending email to Meserias:', error);
        }
      );
    }

    this.router.navigate(['/home-client']);
  }

  trimiteCerereaSiSalveaza() {
    this.salveazaCerereaInBazaDeDate();
    this.trimiteMailuriCuCererea();
    this.alertifyService.success('Cererea a fost trimisă cu succes. Vă mulțumim!'); 
  }

  back() {
    this.router.navigate(['/home-client']);
  }
}
