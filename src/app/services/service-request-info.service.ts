import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestInfoService {
  public userDetails: any = {};

  updateUserDetails(newDetails: any) {
    this.userDetails = { ...this.userDetails, ...newDetails };
  }
}