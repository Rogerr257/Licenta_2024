import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isClientAccount: boolean = true;
  isWorkerAccount: boolean = false;
  isLoggedIn : boolean = false;
  isSkillsTab: boolean = false;
  isServicesTab: boolean = true;

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  loginMethod(): void {
    this.authService.loginWithGoogle();
  }

  logoutMethod(): void {
    this.authService.logoutServiceMethod();
    this.isLoggedIn = false;
  }

  navigateToClientRequestSelection() {
    this.isClientAccount= true;
    this.isWorkerAccount = false;

    this.router.navigate(['/home-client']);
  }

  navigateToWorkerPortal() {
    this.isClientAccount= false;
    this.isWorkerAccount = true;

    this.isSkillsTab= false;
    this.isServicesTab = true;
    this.router.navigate(['/portal']);
  }

  navigateToWorkerSkills() {
    this.isClientAccount= false;
    this.isWorkerAccount = true;

    this.isSkillsTab= true;
    this.isServicesTab = false;
    this.router.navigate(['/profesiile-mele']);
  }
  
}
