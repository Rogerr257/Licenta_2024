import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selection-page1',
  templateUrl: './selection-page1.component.html',
  styleUrls: ['./selection-page1.component.css']
})
export class SelectionPage1Component {
  item: string = '';
  selection1Items = ['Curăţenie', 'Curatenie la Domiciliu', 'Meserias Constructpe', 'Construcţii', 'Meseriasi Constructori', 'Instalatii Sanitare', 'Zugraveli Interioare', 'Psiholog', 'Electrician', 'Instalații Electrice', 'Montaj Aer Conditionat'];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const item = this.activatedRoute.snapshot.queryParams['item'];
    this.item = item;
    const filteredItems = this.selection1Items.filter(item => item === this.item);
    this.selection1Items = filteredItems;

  }

  onItemClick(item: string) {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/selection2']);
  }

  backToHome(item: string) {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['']);
  }

}