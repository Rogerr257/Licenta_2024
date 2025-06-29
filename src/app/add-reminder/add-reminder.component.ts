import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.css'],
})
export class AddReminderComponent {
  // 📝 Form fields
  title: string = '';
  description: string = '';
  eventDate: Date | null = null;

  // 🔁 Tip eveniment: unic sau recurent
  eventType: 'unic' | 'recurent' = 'unic';  // default unic

  // ⚙️ Doar pentru recurent
  frequency: 'lunar' | 'anual' | 'saptamanal' | null = null;

  // 🔔 Notificare
  enableNotification: boolean = false;
  notifyBeforeValue: number | null = null;
  notifyBeforeUnit: 'zile' | 'ore' | 'minute' | null = null;

  // ⚡ UX state
  isLoading: boolean = false;

  constructor(
    private firestore: Firestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async addReminder() {
    if (!this.title || !this.eventDate) {
      this.snackBar.open('⚠ Completează titlul și data evenimentului!', 'Închide', { duration: 3000 });
      return;
    }

    // Dacă notificare activată, verificăm să fie completat corect
    if (this.enableNotification && (!this.notifyBeforeValue || !this.notifyBeforeUnit)) {
      this.snackBar.open('⚠ Completează cu cât timp înainte să fii notificat!', 'Închide', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    try {
      const remindersCollection = collection(this.firestore, 'reminders');

      await addDoc(remindersCollection, {
        title: this.title,
        description: this.description,
        eventDate: this.eventDate,
        createdAt: new Date(),
        type: this.eventType,
        frequency: this.eventType === 'recurent' ? this.frequency : null,
        notifyBefore: this.enableNotification
          ? { value: this.notifyBeforeValue, unit: this.notifyBeforeUnit }
          : null
      });

      this.snackBar.open('✅ Reminder salvat cu succes!', 'Închide', { duration: 3000 });
      this.router.navigate(['/reminders-list']);
    } catch (error) {
      console.error('Eroare la salvare reminder:', error);
      this.snackBar.open('❌ Eroare la salvare reminder!', 'Închide', { duration: 3000 });
    } finally {
      this.isLoading = false;
    }
  }
}
