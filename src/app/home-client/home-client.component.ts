import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData}  from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css']
})
export class HomeClientComponent {

  homeItems: any;
  viata: any;

  constructor(private router: Router, private firestore: Firestore, private userService: AuthService) { }

  
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
    // console.log('pa');

    // usersCollection = collection(this.firestore, 'users');
    // collectionData(usersCollection).subscribe((users) => {
    //   console.log('buna');
    //   console.log(this.users);
    //   this.users = users;
    // });

   }

  onItemClick(item: any) {
    this.router.navigate(['/selection'], { queryParams: { item: item.nume } });
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'servicii-de-baza');
    this.homeItems = collectionData(collectionInstance);
  }

}

