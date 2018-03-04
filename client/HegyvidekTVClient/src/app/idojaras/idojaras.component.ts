import { Component, OnInit } from '@angular/core';
import { IdojarasService } from '../services/idojaras.service';

@Component({
  selector: 'app-idojaras',
  templateUrl: './idojaras.component.html',
  styleUrls: ['./idojaras.component.css']
})
export class IdojarasComponent implements OnInit {
  idojaras: any;
  hetNapjai = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
  nap1; nap2; nap3; nap4;
  constructor(private idojarasService: IdojarasService) {}

  ngOnInit() {
    this.idojarasService.elorejelzes().subscribe(response => {
      this.idojaras = response;
      this.nap1 = this.hetNapjai[new Date(this.idojaras.list[0].dt * 1000).getDay()];
      this.nap2 = this.hetNapjai[new Date(this.idojaras.list[1].dt * 1000).getDay()];
      this.nap3 = this.hetNapjai[new Date(this.idojaras.list[2].dt * 1000).getDay()];
      this.nap4 = this.hetNapjai[new Date(this.idojaras.list[3].dt * 1000).getDay()];
    });
  }

}
