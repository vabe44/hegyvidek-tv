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
        console.log(response);
        if (response.gmail) {
          console.log('siker');
        } else  {
          console.log('error');
        }
      });
  }

  torles() {
    this.kapcsolatService.torles()
    .subscribe(response => {
      console.log(response);
      if (response.gmail) {
        this.gmail = response.gmail;
        console.log('siker');
      } else  {
        console.log('error');
      }
    });
  }

}
