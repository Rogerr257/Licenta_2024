// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private buttonVisibleSubject = new BehaviorSubject<boolean>(true);
  buttonVisible$ = this.buttonVisibleSubject.asObservable();

  constructor() {}

  toggleButtonVisibility() {
    const currentValue = this.buttonVisibleSubject.getValue();
    this.buttonVisibleSubject.next(!currentValue);
  }
}

