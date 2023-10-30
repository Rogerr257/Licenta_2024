import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-selection1',
  templateUrl: './job-selection1.component.html',
  styleUrls: ['./job-selection1.component.css'],
})
export class JobSelection1Component {
  item: string = '';
  selection1Items = [
    { tip: 'Curăţenie', selectie: 'Calcat rufe' },
    { tip: 'Curăţenie', selectie: 'Curăţenie la domiciliu' },
    { tip: 'Curăţenie', selectie: 'Curăţenie birouri' },
    { tip: 'Curăţenie', selectie: 'Curăţenie gradina' },
    { tip: 'Curăţenie', selectie: 'Curăţenie scari de bloc' },
    { tip: 'Construcţii', selectie: 'Curăţenie scari de bloc' },
    { tip: 'Construcţii', selectie: 'Curăţenie scari de bloc' },
    { tip: 'Construcţii', selectie: 'Curăţenie scari de bloc' },
  ];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const item = this.activatedRoute.snapshot.queryParams['item'];
    this.item = item;
    const filteredItems = this.selection1Items.filter(
      (item) => item.tip === this.item
    );
    this.selection1Items = filteredItems;
  }

  onItemClick(item: { tip: string; selectie: string }) {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/selection2']);
  }

  backToHome(item: string) {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['']);
  }


}
