import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs-portal-details',
  templateUrl: './jobs-portal-details.component.html',
  styleUrls: ['./jobs-portal-details.component.css']
})
export class PortalServiceComponent {
  cerereDeServiciuComplet: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cerereDeServiciuComplet = this.activatedRoute.snapshot.queryParams['serviciuDinPortal'];

    // undefined
    // serviciuComplet
  }

  aplicaPentruCerere() {
    // aplicaPentruCerere
  }


}
