import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Firestore,
  collection,
  query,
  where,
  updateDoc,
  doc,
  getDocs,
} from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

interface DocumentWithId {
  id: string;
}

@Component({
  selector: 'app-professional-services',
  templateUrl: './professional-services.component.html',
  styleUrls: ['./professional-services.component.css'],
})
export class ProfessionalServicesComponent {
  userId: any;
  serviciiAsociateMeserias: any;
  documentIds: string[] = [];

  constructor(
    private router: Router,
    private firestore: Firestore,
    private userService: AuthService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user) => {
      this.userId = user;

      this.getItems().subscribe((items: any) => {
        this.serviciiAsociateMeserias = items;
      });

      // this.getDocumentIds("meseriiProfesionisti");
    });
  }

  getItems(): any {
    const collectionInstance = collection(this.firestore, 'meseriiProfesionisti');
    const filteredQuery = query(collectionInstance, where('email', '==', this.userId.email));
  
    return from(getDocs(filteredQuery)).pipe(
      map((querySnapshot: any) => {
        const documents: DocumentWithId[] = [];
  
        querySnapshot.forEach((doc: any) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
  
        return documents;
      })
    );
  }

  backToHome() {
    this.router.navigate(['/home-client']);
  }

  async salveazaProfesiile() {
    // Iterate through each service and update its corresponding document
    this.serviciiAsociateMeserias.forEach(async (service: any) => {
      const docRef = doc(
        this.firestore,
        `meseriiProfesionisti/${service.id}`
      );
      await updateDoc(docRef, { selectate: service.selectate });
    });

    this.alertifyService.success('Profesiile au fost actualizate cu succes!'); 
  }

}
