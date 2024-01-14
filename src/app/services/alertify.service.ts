import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  confirm(message: string, okCallback: () => any): any {
    alertify.confirm(message, (e: any) => {
      if (e) {
        okCallback();
      } else {
      }
    });
  }

  success(message: string): any {
    alertify.set('notifier', 'position', 'bottom-center');
    alertify.success(message);
  }

  error(message: string): any {
    alertify.set('notifier', 'position', 'bottom-center');
    alertify.error(message);
  }

  warning(message: string): any {
    alertify.set('notifier', 'position', 'bottom-center');
    alertify.warning(message);
  }

  message(message: string): any {
    alertify.set('notifier', 'position', 'bottom-center');
    alertify.message(message);
  }

  alert(message: string): any {
    alertify.set('notifier', 'position', 'bottom-center');

    alertify.alert(message);
  }
}
