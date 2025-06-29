import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // sau ce folosești
import { Reminder } from '../models/reminder.model'; // dacă faci model separat

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  constructor(private firestore: AngularFirestore) {}

  addReminder(reminder: Reminder) {
    return this.firestore.collection('reminders').add(reminder);
  }

  async getReminders(): Promise<Reminder[]> {
    const snapshot = await this.firestore.collection<Reminder>('reminders').get().toPromise();
    return snapshot?.docs.map(doc => doc.data()) || [];
  }
}
