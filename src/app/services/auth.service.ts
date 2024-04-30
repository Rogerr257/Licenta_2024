import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertifyService } from './alertify.service';
import firebase from 'firebase/compat/app';
import { Observable, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData, doc, getDoc, setDoc, addDoc , query, where} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private alertifyService: AlertifyService,
    private router: Router,
    private firestore: Firestore
  ) {}

  // Sign in with Google
  loginWithGoogle(): any {
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  // Method to save user information in Firestore collection
  async saveUserToFirestore(user: firebase.User): Promise<void> {
    const userRef = doc(this.firestore, `users/${user.uid}`);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        isAdmin: false,
        isProfessional: false,
        isClient: false
      });

      const dateNecesare = await this.getData(user.email);
      //console.log(dateNecesare);
    }
  }

  async getData(email: any): Promise<any> {

      let aServiciiBaza: any = [];
      let aMeseriileUnuiAsociat: any = [];

      const colectieServiciiBaza = collection(this.firestore, 'servicii-de-baza');
      const colectieServiciiBazaAsociate = collection(this.firestore, 'meseriiProfesionisti');

      const refServiciiBaza = collectionData(colectieServiciiBaza) as Observable<any[]>;
      const refMeseriileUnuiAsociat = collectionData(colectieServiciiBazaAsociate) as Observable<any[]>;

      aServiciiBaza = await firstValueFrom(refServiciiBaza);
      aMeseriileUnuiAsociat = await firstValueFrom(refMeseriileUnuiAsociat);

      for (const serviciu of aServiciiBaza) {
        const meserie = {
          email: email,
          serviciu: serviciu.nume,
          selectate: false
        }
        //await addDoc(colectieServiciiBazaAsociate, meserie);
      }

      return {
        meseriileAsociate: aMeseriileUnuiAsociat,
        serviciiBaza: aServiciiBaza
      };
   
  }

  authStateFunction(user: any): void {
    if (user) {
      // Save user to Firestore upon logout
      this.saveUserToFirestore(user);
    } else {
      this.alertifyService.success('Logged Out');
      this.router.navigate(['/']);
    }
  }

  logoutServiceMethod(): void {
    this.afAuth.signOut();
    this.afAuth.onAuthStateChanged((user: any) => {
      this.authStateFunction(user);
    });
  }

  getCurrentUser(): Observable<firebase.User | null> {
    return this.afAuth.authState;
    // function that returns an Observable<firebase.User | null> based on the informations of the logged user
  }

  // canActivate(): Observable<boolean> {
  //   return this.getCurrentUser().pipe(
  //     map((user) => {
  //       if (user) {
  //         return true;
  //       } else {
  //         this.router.navigate(['/home-client']);
  //         return false;
  //       }
  //     })
  //   );
  // }

  getProfUserJobs(): any {
    
  }

  // Auth logic to run auth providers
  // AuthLogin(provider: any) {
  //   return this.afAuth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       console.log('You have been successfully logged in!');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
}
