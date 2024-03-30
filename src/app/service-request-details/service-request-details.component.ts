import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';
import { ServiceRequestInfoService } from '../services/service-request-info.service';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-service-request-details',
  templateUrl: './service-request-details.component.html',
  styleUrls: ['./service-request-details.component.css']
})
export class ServiceRequestDetailsComponent implements OnInit {
  name: any;
  email: any;
  message: any;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private firebaseService: FirebaseService,
    private serviceRequest: ServiceRequestInfoService,
    private emailService: EmailService,
  ) {

  }

  ngOnInit() {
  }

  sendFinalRequest() {

    this.firebaseService.submitRequest(this.serviceRequest.InformatiiPentruCerere);

    this.emailService.sendEmail(this.name, this.email, this.message).subscribe(
      (response) => {
        console.log('Email sent successfully!');
      },
      (error) => {
        console.log('Error sending email:', error);
      }
    );

    this.router.navigate(['/home-client']);
    // thank you for using Mesteri la un Click, ceva de genul dupa ce ce ai trimis mailul

  }


  back() {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/home-client']);
  }

}
