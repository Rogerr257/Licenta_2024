import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedInAsClient: boolean = false;
  isLoggedAsProfessional: boolean = false;
  user: { isAdmin: string; isProfessional: boolean; isClient: boolean };

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user = { isAdmin: 'roger', isProfessional: false, isClient: true };
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

  loginMethod(): void {
    this.authService.loginWithGoogle();
  }

  logoutMethod(): void {
    this.authService.logoutServiceMethod();
    this.isLoggedInAsClient = false;
  }

  navigateToPortal() {
    this.user.isClient = false;
    this.user.isProfessional = true;

    this.router.navigate(['/portal']);
  }

  navigateToClientRequestSelection() {
    this.user.isClient = true;
    this.user.isProfessional = false;

    this.router.navigate(['/home-client']);
  }
}
