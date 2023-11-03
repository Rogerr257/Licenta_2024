import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-location-time',
  templateUrl: './job-location-time.component.html',
  styleUrls: ['./job-location-time.component.css'],
})
export class JobLocationTimeComponent implements OnInit {
  judete: any = [
    {numeJudet: 'Alba', listaOrase: ['oras1', 'oras2', 'oras3']},
    {numeJudet: 'Arad', listaOrase: ['oras52', 'oras22', 'oras96']}
  ];
  orase: string[] = [];
  dataLucrarii: any; 

  constructor(private router: Router) {}

  ngOnInit() {
    console.log("yhsyhshrws");
  }

  onJudetChange(event: any) {
    const judetulSelectat = this.judete.find(
      (item: any) => item.numeJudet === event.value
    );

    this.orase = judetulSelectat.listaOrase;
  }

  onOrasChange(event: any) {
    const orasSelectat =  event.value;
  }

  onDatePickerChange(event: any) {
    const date = event.value;
    const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    console.log(dateString);
  }


  continue() {
    // Redirect the user to the selection-page1 component
    this.router.navigate(['/additional_details']);

  }
}
