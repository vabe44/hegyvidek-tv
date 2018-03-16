import { Component, OnInit } from '@angular/core';
import { Musor } from '../interfaces/Musor';
import { MusorService } from '../services/musor.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  musorok: Musor[];
  constructor(private musorService: MusorService) { }

  ngOnInit() {
    this.musorService.aktiv().subscribe(response => this.musorok = response.musorok);
  }

}
