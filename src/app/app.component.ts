import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SharedService } from './services/shared.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isClientAccount: boolean = true;
  isWorkerAccount: boolean = false;
  isLoggedIn: boolean = false;
  isSkillsTab: boolean = false;
  isServicesTab: boolean = true;
  isCurrentUserIsAdmin: boolean = false;
  dbUsers: any;
  currentUser: any; 
 
  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private sharedService: SharedService,
    private firestore: Firestore
  ) {}

  toggleButtonVisibility() {
    this.sharedService.toggleButtonVisibility();
  }

  getUsers() {
    const collectionInstance = collection(this.firestore, 'users');
    return collectionData(collectionInstance);
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.currentUser = user;

      } else {
        this.isLoggedIn = false;
      }
    });

            
    this.getUsers().subscribe((users) => {
      this.dbUsers = users;
      this.isCurrentUserIsAdmin = this.dbUsers.find((entry: any) => entry.uid === this.currentUser.uid && entry.isAdmin === true);
      console.log(this.isCurrentUserIsAdmin);

    });
  }

  loginMethod(): void {
    this.authService.loginWithGoogle();
  }
  
  logoutMethod(): void {
    this.authService.logoutServiceMethod();
    this.isLoggedIn = false;
    this.toggleButtonVisibility();
  }
  navigateToClientRequestSelection() {
    this.isClientAccount = true;
    this.isWorkerAccount = false;
    this.router.navigate(['/home-client']);
  }
  navigateToAdminPage() {
    this.router.navigate(['/admin-page']);
  }
  navigateToWorkerPortal() {
    this.isClientAccount = false;
    this.isWorkerAccount = true;
    this.isSkillsTab = false;
    this.isServicesTab = true;
    this.router.navigate(['/portal']);
  }
  navigateToWorkerSkills() {
    this.isClientAccount = false;
    this.isWorkerAccount = true;
    this.isSkillsTab = true;
    this.isServicesTab = false;
    this.router.navigate(['/profesiile-mele']);
  }
}
