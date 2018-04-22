import { Component, OnInit } from '@angular/core';
import { KapcsolatService } from '../services/kapcsolat.service';

@Component({
  selector: 'app-kapcsolat',
  templateUrl: './kapcsolat.component.html',
  styleUrls: ['./kapcsolat.component.css']
})
export class KapcsolatComponent implements OnInit {

  uzenet: any = {};
  constructor(private kapcsolatService: KapcsolatService) {
    this.uzenet = {
      nev: '',
      email: '',
      targy: '',
      level: '',
    };
  }

  ngOnInit() {
  }

  kuldes() {
    this.kapcsolatService.kuldes(this.uzenet)
      .subscribe(response => {
        alert(response.message);
        if (response.sent) {
          this.uzenet = {
            nev: '',
            email: '',
            targy: '',
            level: '',
          };
        }
      });
  }
}
