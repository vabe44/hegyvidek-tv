import { Component, OnInit } from '@angular/core';
import { IdojarasService } from '../services/idojaras.service';

@Component({
  selector: 'app-idojaras',
  templateUrl: './idojaras.component.html',
  styleUrls: ['./idojaras.component.css']
})
export class IdojarasComponent implements OnInit {
  idojaras: any;
  Math: any;
  ma: string;
  hetNapjai = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
  datum: number;
  honap: string;
  honapok = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július',
              'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
  nap1; nap2; nap3; nap4;
  constructor(private idojarasService: IdojarasService) {}

  ngOnInit() {
    this.Math = Math;
    this.ma = this.hetNapjai[new Date(Date.now()).getDay()];
    this.datum = new Date(Date.now()).getDate();
    this.honap = this.honapok[new Date(Date.now()).getMonth()];
    this.idojarasService.elorejelzes().subscribe(response => this.idojaras = response);
  }

}
