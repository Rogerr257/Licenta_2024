import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedInAsClient: boolean = false;
  isLoggedAsProfessional: boolean = false;
  
  user: {isAdmin: string}

  nbrOfRoomsInShoppingCart: number = 1
  
  constructor(private authService: AuthService, private afAuth: AngularFireAuth) { 
    this.user = {isAdmin: "roger"};
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isLoggedInAsClient = true;
      } else {
        this.isLoggedInAsClient = false;
      }
    });
  }

  recapReservations(): void {
    
  }

  loginMethod(): void {
    this.authService.loginWithGoogle();
  }

  logoutMethod(): void {
    
    this.authService.logoutServiceMethod();
    this.isLoggedInAsClient = false;
  }
  
}
