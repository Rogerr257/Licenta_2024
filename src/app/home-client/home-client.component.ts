import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, doc ,collectionData}  from '@angular/fire/firestore';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css']
})
export class HomeClientComponent {

  homeItems: any;

  constructor(private router: Router, private firestore: Firestore) { }

  ngOnInit() {
    this.getData();
   }

  onItemClick(item: string) {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/selection'], { queryParams: { item: item } });
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'servicii-de-baza');

   this.homeItems = collectionData(collectionInstance);

    collectionData(collectionInstance)
    .subscribe(val=>{
      console.log(val);
    });

  }

}

