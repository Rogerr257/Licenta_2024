import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ServiceRequestInfoService } from '../services/service-request-info.service';
import { collection, Firestore, collectionData } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css'],
})
export class HomeClientComponent {
  serviciiPrimare: any;
  serviciuPrincipal: any;
  clientAplicatie: any;
  buttonAppearence = true;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private authService: AuthService,
    private cerereDeServiciuInFormare: ServiceRequestInfoService,
    private afAuth: AngularFireAuth,
    private sharedService: SharedService
  ) {
    this.subscription = this.sharedService.buttonVisible$.subscribe(
      (visible) => {
        this.buttonAppearence = visible;
      }
    );
  }

  ngOnInit() {
    this.getData();
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.clientAplicatie = user;
      }
    });

    // this.authService.getCurrentUser().subscribe((user) => {
    //   this.clientAplicatie = user;
    //   console.log(this.clientAplicatie.email);
    // });
  }

  onItemClick(serviciulSelectat: any) {
    this.serviciuPrincipal = serviciulSelectat.nume;

    this.cerereDeServiciuInFormare.InformatiiPentruCerere = {
      serviciuPrincipal: this.serviciuPrincipal,
      mailClient: this.clientAplicatie.email,
    };

    this.router.navigate(['/selection'], {
      queryParams: { serviciulSelectat: serviciulSelectat.nume },
    });
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'servicii-de-baza');
    this.serviciiPrimare = collectionData(collectionInstance);
  }

  loginMethodFromHomeClient(): void {
    this.authService.loginWithGoogle();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
