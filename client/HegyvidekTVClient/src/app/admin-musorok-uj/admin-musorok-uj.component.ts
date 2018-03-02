import { Musor } from './../interfaces/Musor';
import { MusorService } from './../services/musor.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-musorok-uj',
  templateUrl: './admin-musorok-uj.component.html',
  styleUrls: ['./admin-musorok-uj.component.css']
})
export class AdminMusorokUjComponent {

  constructor(
    private router: Router,
    private musorService: MusorService) { }

  ujMusor(musor) {
    this.musorService.uj(musor)
      .subscribe(response => {
        console.log(response);
        if (response.musor) {
          this.router.navigate(['/admin/musorok']);
        } else  {
          console.log('error');
        }
      });
  }
}
