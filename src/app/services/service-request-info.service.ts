import { Injectable } from '@angular/core';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestInfoService {
  public InformatiiPentruCerere: any = {};

  constructor( private alertifyService: AlertifyService ) { }

  updateUserDetails(informatiiNoi: any) {
    this.InformatiiPentruCerere = { ...this.InformatiiPentruCerere, ...informatiiNoi };
    // console.log(this.InformatiiPentruCerere);
    // this.alertifyService.success(this.InformatiiPentruCerere);
  }
}