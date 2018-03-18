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
        console.log(response);
        if (response.sent) {
          alert('Siker! Üzenet elküldve.');
          this.uzenet = {
            nev: '',
            email: '',
            targy: '',
            level: '',
          };
        } else  {
          alert(response.message);
        }
      });
  }

}
