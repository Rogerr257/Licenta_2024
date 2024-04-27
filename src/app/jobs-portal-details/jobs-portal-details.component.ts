import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  collection,
  collectionData,
  Firestore,
  query,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-jobs-portal-details',
  templateUrl: './jobs-portal-details.component.html',
  styleUrls: ['./jobs-portal-details.component.css']
})
export class PortalServiceComponent {
  cerereDeServiciuComplet: any;
  userId: any; 
  identificatorUnic: any; 
  servicesRequestsCollection: any;
  servicesRequests: any; 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(params => {
      this.identificatorUnic = params['identificatorUnic'];
    });

    this.servicesRequestsCollection = collection(
      this.firestore,
      'cereriDeServicii'
    );
  
    this.servicesRequests = collectionData(
      query(
        this.servicesRequestsCollection,
        where('identificatorUnic', '==', this.identificatorUnic)
      )
    ) as Observable<any[]>;

    // this.servicesRequests = collectionData(this.servicesRequestsCollection) as Observable<any[]>;
    this.servicesRequests.subscribe((data: any) => {
      this.cerereDeServiciuComplet = data;
    });

    console.log(this.cerereDeServiciuComplet);
  }

  aplicaPentruCerere() {
    // aplicaPentruCerere
  }


  // facem in felul urmator 
  // toate cererile din portal se incarca pe baza checkurile profesionistului din pagina lui de checks 
  // la prima logare pentru profesionist se face addDoc de toate serviciile 
  // apoi cand se logheaza iar nu se mai face asta 

  // o sa se incarce mereu meseriile lui asociate bazat pe un filtru care se aplica pe colectia de date la init 
  // checkurile trebuie sa ramana selectate/ salvate la noua logare 

  // inca nu merge incarcarea detaliile unui serviciu pentru a aplica 

  // trebuie sa vedem ce mail o sa dea profesionistul la client 

  // trebuie modificat - facem un boolean - cand e mail de client / mail de profesionist 
  // o sa salvam in body si facem if ul in node js 
  // daca e prof o sa avem un text area in care profesionistul ii spune clientului cat vrea pe lucrare
  // aia e 

  // inca e problema la logare ca nu dispare vutonul si nu se incarca pag buna 
  // hai sa rezolvam cu tabela de useri ca depindem cu ea de tot - can activate ala ...

  // sunt 3 moduri de mail ca prof nu primeste mail de confirmare precum clientnul - ci de notificare

}
