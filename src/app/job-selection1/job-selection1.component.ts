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
    { tip: 'Curăţenie', selectie: 'Curăţenie in casa' },
    { tip: 'Curăţenie', selectie: 'Curăţenie birouri' },
    { tip: 'Curăţenie', selectie: 'Curăţenie gradina' },
    { tip: 'Curăţenie', selectie: 'Curăţenie scari de bloc' },
    { tip: 'Montaj Mobila', selectie: 'Montaj mobila bucatarie' },
    { tip: 'Montaj Mobila', selectie: 'Montaj mobila de sufragerie/ dormitor' },
    { tip: 'Montaj Mobila', selectie: 'Montaj mobila industriala' },
    { tip: 'Design Interior', selectie: 'Design Interior' },
    { tip: 'Instalații Electrice', selectie: 'Instalație electrică casa' },
    { tip: 'Instalații Electrice', selectie: 'Racordare curent electric' },
    { tip: 'Deratizare', selectie: 'Deratizare casa' },
    { tip: 'Mutari Profesionale', selectie: 'Mutari profesionale' },
    { tip: 'Instalatii Sanitare', selectie: 'Instalatii la baie' }, 
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
    this.router.navigate(['/details']);
  }

  backToHome() {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/home-client']);
  }


}
