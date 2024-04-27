// firebase.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  // Example: Submit request to Firebase
  async submitRequest(requestData: any): Promise<void> {
    // Implement the logic to store data in Firebase
    const colectieDeOrase = collection(this.firestore, 'cereriDeServicii');

    await addDoc(colectieDeOrase, requestData);
  }
}