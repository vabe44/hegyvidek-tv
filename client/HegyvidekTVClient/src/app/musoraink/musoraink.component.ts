import { Component, OnInit } from '@angular/core';
import { Musor } from '../interfaces/Musor';
import { MusorService } from '../services/musor.service';

@Component({
  selector: 'app-musoraink',
  templateUrl: './musoraink.component.html',
  styleUrls: ['./musoraink.component.css']
})
export class MusorainkComponent implements OnInit {

  musorok: Musor[];
  constructor(private musorService: MusorService) { }

  ngOnInit() {
    this.musorService.aktiv().subscribe(response => this.musorok = response.musorok);
  }

}
