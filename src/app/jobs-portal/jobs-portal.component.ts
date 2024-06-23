import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-jobs-portal',
  templateUrl: './jobs-portal.component.html',
  styleUrls: ['./jobs-portal.component.css'],
})
export class JobsPortalComponent {
  servicesRequestsCollection: any;
  servicesRequests: any;
  allServicesData: any;
  serviciiFiltrate: any;
  userId: any;
  existaServiciiPentruMester: any;

  constructor(
    private firestore: Firestore,
    private userService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obținem utilizatorul curent
    this.userService.getCurrentUser().subscribe((user) => {
      this.userId = user;
      this.servicesRequestsCollection = collection(
        this.firestore,
        'cereriDeServicii'
      );
      // Obținem colecția de cereri de servicii din Firestore
      this.servicesRequests = collectionData(
        this.servicesRequestsCollection
      ) as Observable<any[]>;
      // Ne subscriem la modificările în cererile de servicii
      this.servicesRequests.subscribe((data: any[]) => {
        this.allServicesData = data;
        // Odată ce am primit datele din prima colecție, obținem datele din a doua colecție
        const meseriiProfesionistiCollection = collection(
          this.firestore,
          'meseriiProfesionisti'
        );
        // Odată ce am primit datele din prima colecție, obținem datele din a doua colecție
        const meseriiProfesionistiData = collectionData(
          meseriiProfesionistiCollection
        ) as Observable<any[]>;
        // Observăm modificările în datele din a doua colecție
        meseriiProfesionistiData.subscribe((meseriiData: any[]) => {
          // Acum avem date din ambele colecții, putem compara și salva așa cum este necesar
          this.serviciiFiltrate = this.filterData(
            this.allServicesData,
            meseriiData
          );

          if(this.serviciiFiltrate.length === 0){
            this.existaServiciiPentruMester = false;
          }
         // console.log(this.serviciiFiltrate);
          //console.log(this.userId.email);
        });

      });
    });
  }

  // Metodă pentru filtrarea datelor
  
  filterData(data1: any[], data2: any[]): any[] {
    // Filtrăm datele din data1 bazat pe condiția descrisă
    const filteredData = data1.filter((item1) => {
      // Găsim elementul corespunzător în data2 unde serviciu se potrivește cu serviciuPrincipal și selectate este true
      const matchingItem = data2.find(
        (item2) =>
          item2.serviciu === item1.serviciuPrincipal &&
          item2.selectate === true &&
          this.userId.email === item2.email
      );
      // Returnăm true dacă matchingItem există
      return !!matchingItem;
    });
    return filteredData; // Returnăm datele filtrate
  }


  async veziDetaliicOportunitate(serviciuComplet: any) {
    // Redirecționăm către pagina de detalii a oportunității de serviciu, transmițând identificatorul unic ca parametru de rutare
    this.router.navigate(['/jobs-portal-details', serviciuComplet.identificatorUnic], {
      queryParams: { identificatorUnic: serviciuComplet.identificatorUnic },
    });
  }

}
