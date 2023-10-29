import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: {isAdmin: string}
  nbrOfRoomsInShoppingCart: number = 1
  constructor() { 
    this.user = {isAdmin: "roger"};
  }

  ngOnInit() {

    
  }

  recapReservations(): void {
    
  }

  loginMethod(): void {
    
  }

  logoutMethod(): void {
    
  }
  

}
