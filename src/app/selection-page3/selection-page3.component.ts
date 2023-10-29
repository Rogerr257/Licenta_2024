import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selection-page3',
  templateUrl: './selection-page3.component.html',
  styleUrls: ['./selection-page3.component.css']
})
export class SelectionPage1Component {
  item: string = '';
  selection3Items = ['Curăţenie', 'Curatenie la Domiciliu', 'Meserias Constructpe', 'Construcţii', 'Meseriasi Constructori', 'Instalatii Sanitare', 'Zugraveli Interioare', 'Psiholog', 'Electrician', 'Instalații Electrice', 'Montaj Aer Conditionat'];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const item = this.activatedRoute.snapshot.queryParams['item'];
    this.item = item;
    const filteredItems = this.selection3Items.filter(item => item === this.item);
    this.selection3Items = filteredItems;

  }

  onItemClick(item: string) {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/new']);
  }

  backToSelection2(item: string) {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['selection2']);
  }

}