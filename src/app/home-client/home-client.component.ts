import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css']
})
export class HomeClientComponent {

  homeItems = ['Curăţenie', 'Montaj Mobila', 'Design Interior',
    'Instalații Electrice', 'Deratizare',
    'Mutari Profesionale', 'Instalatii Sanitare'];

  constructor(private router: Router) { }

  ngOnInit() { }

  onItemClick(item: string) {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/selection1'], { queryParams: { item: item } });
  }

}

