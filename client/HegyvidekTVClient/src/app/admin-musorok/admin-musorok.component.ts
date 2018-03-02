import { Component, OnInit } from '@angular/core';
import { Musor } from '../interfaces/Musor';
import { MusorService } from '../services/musor.service';

@Component({
  selector: 'app-admin-musorok',
  templateUrl: './admin-musorok.component.html',
  styleUrls: ['./admin-musorok.component.css']
})
export class AdminMusorokComponent implements OnInit {

  musorok: Musor[];
  constructor(private musorService: MusorService) { }

  ngOnInit() {
    this.musorService.osszes().subscribe(response => this.musorok = response.musorok);
  }

}
