import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selection-page2',
  templateUrl: './selection-page2.component.html',
  styleUrls: ['./selection-page2.component.css']
})
export class SelectionPage2Component {
  item: string = '';
  selection2Items = ['Curăţenie', 'Curatenie la Domiciliu', 'Meserias Constructpe', 'Construcţii', 'Meseriasi Constructori', 'Instalatii Sanitare', 'Zugraveli Interioare', 'Psiholog', 'Electrician', 'Instalații Electrice', 'Montaj Aer Conditionat'];

  
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const item = this.activatedRoute.snapshot.queryParams['item'];
    this.item = item;
    const filteredItems = this.selection2Items.filter(item => item === this.item);
    this.selection2Items = filteredItems;


  }

  onItemClick(item: string) {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/selection3']);
  }

  backToSelection1(item: string) {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['selection1']);
  }

}