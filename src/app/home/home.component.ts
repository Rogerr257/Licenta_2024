import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  homeItems = ['Curăţenie', 'Curatenie la Domiciliu', 'Meserias Constructpe', 'Construcţii', 'Meseriasi Constructori', 'Instalatii Sanitare', 'Zugraveli Interioare', 'Psiholog', 'Electrician', 'Instalații Electrice', 'Montaj Aer Conditionat'];

  constructor(private router: Router) { }

  ngOnInit() { }

  onItemClick(item: string) {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/selection1'], { queryParams: { item: item } });
  }

}
