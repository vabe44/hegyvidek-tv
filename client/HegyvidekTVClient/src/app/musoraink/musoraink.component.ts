import { Component, OnInit } from '@angular/core';
import { Musor } from '../interfaces/Musor';
import { MusorService } from '../services/musor.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-musoraink',
  templateUrl: './musoraink.component.html',
  styleUrls: ['./musoraink.component.css']
})
export class MusorainkComponent implements OnInit {

  musorok: Musor[];
  constructor(private musorService: MusorService) { }

  ngOnInit() {
    this.musorService.aktiv().subscribe(response => this.musorok = response.musorok.map(musor => {
      musor.kep = environment.url + musor.kep;
      return musor;
    }));
  }

}
