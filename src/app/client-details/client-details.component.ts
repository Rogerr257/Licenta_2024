import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent {


  constructor(private router: Router){}

  continue() {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/client-details']);
  }

  back() {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/additional-details']);
  }
}
