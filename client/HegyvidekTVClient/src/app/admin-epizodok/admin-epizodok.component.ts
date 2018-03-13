import { Component, OnInit } from '@angular/core';
import { Epizod } from '../interfaces/Epizod';
import { EpizodService } from '../services/epizod.service';

@Component({
  selector: 'app-admin-epizodok',
  templateUrl: './admin-epizodok.component.html',
  styleUrls: ['./admin-epizodok.component.css']
})
export class AdminEpizodokComponent implements OnInit {

  epizodok: Epizod[];
  constructor(private epizodService: EpizodService) { }

  ngOnInit() {
    this.epizodService.osszes().subscribe(response => this.epizodok = response.epizodok);
  }

}
