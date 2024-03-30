import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ServiceRequestInfoService } from '../services/service-request-info.service';
import {
  collection,
  Firestore,
  updateDoc,
  collectionData,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css'],
})
export class HomeClientComponent {
  serviciiPrimare: any;
  serviciuPrincipal: any;
  clientAplicatie: any;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private userService: AuthService,
    private cerereDeServiciuInFormare: ServiceRequestInfoService
  ) {
    this.userService.getCurrentUser().subscribe((user) => {
      this.clientAplicatie = user;
    })
  }

  ngOnInit() {
    this.getData();

    // await addDoc(usersCollection, {
    //   email: utilizatorNou.email,
    //   isClient: true,
    //   isProfessional: true,
    //   isAdmin: true,
    // });

    // const utilizatorExistent = this.users.find(
    //   (item: any) => item.email === utilizatorNou.email
    // );
    // usersCollection = collection(this.firestore, 'users');
    // collectionData(usersCollection).subscribe((users) => {
    //   console.log('buna');
    //   console.log(this.users);
    //   this.users = users;
    // });
  }

  onItemClick(serviciulSelectat: any) {
    this.serviciuPrincipal = serviciulSelectat.nume;

    this.cerereDeServiciuInFormare.InformatiiPentruCerere = {
      serviciuPrincipal: this.serviciuPrincipal,
      mailClient: this.clientAplicatie.email,
    };

    this.router.navigate(['/selection'], { queryParams: { serviciulSelectat: serviciulSelectat.nume } });
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'servicii-de-baza');
    this.serviciiPrimare = collectionData(collectionInstance);
  }
}
