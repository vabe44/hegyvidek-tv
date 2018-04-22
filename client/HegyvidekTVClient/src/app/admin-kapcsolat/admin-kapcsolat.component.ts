import { Component, OnInit } from '@angular/core';
import { KapcsolatService } from '../services/kapcsolat.service';
import { Gmail } from '../interfaces/Gmail';

@Component({
  selector: 'app-admin-kapcsolat',
  templateUrl: './admin-kapcsolat.component.html',
  styleUrls: ['./admin-kapcsolat.component.css']
})
export class AdminKapcsolatComponent implements OnInit {

  gmail: Gmail;
  constructor(private kapcsolatService: KapcsolatService) {
  }

  ngOnInit() {
    this.kapcsolatService.beallitasok().subscribe(response => this.gmail = response.gmail);
  }

  frissites() {
    this.kapcsolatService.frissites(this.gmail)
      .subscribe(response => {
        alert(response.message);
      });
  }

  torles() {
    this.kapcsolatService.torles()
    .subscribe(response => {
      alert(response.message);
      if (response.gmail) {
        this.gmail = response.gmail;
      }
    });
  }

}
