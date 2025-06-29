import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Reminder {
  title: string;
  description: string;
  eventDate: any;       // poate fi Date sau Timestamp, depinde cum le stochezi
  reminderDate: any;
}

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.css']
})
export class RemindersListComponent implements OnInit {
  reminders$: Observable<Reminder[]> | undefined;  // folosim Observable direct, elegant și reactive

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const remindersCollection = collection(this.firestore, 'reminders');
    this.reminders$ = collectionData(remindersCollection, { idField: 'id' }) as Observable<Reminder[]>;
  }
}
