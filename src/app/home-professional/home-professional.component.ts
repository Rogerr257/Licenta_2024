import { Component } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-home-professional',
  templateUrl: './home-professional.component.html',
  styleUrls: ['./home-professional.component.css']
})
export class HomeProfessionalComponent {

  constructor(
    private readonly firestore: Firestore,
    private readonly router: Router,
  ){}
  
}


