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
    //se redirectioneaza userul la pagina cu informatiile personale ale clientului care se completeaza in cerere
    this.router.navigate(['/client-details']);
  }

  back() {
    //se redirectioneaza userul la pagina anterioara
    this.router.navigate(['/additional-details']);
  }
}
