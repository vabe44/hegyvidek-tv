import { Component, OnInit } from '@angular/core';
import { MusorService } from '../services/musor.service';
import { Musor } from '../interfaces/Musor';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-musorok-modosit',
  templateUrl: './admin-musorok-modosit.component.html',
  styleUrls: ['./admin-musorok-modosit.component.css']
})
export class AdminMusorokModositComponent implements OnInit {

  musor: any = {};
  constructor(
  private router: Router,
  private musorService: MusorService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.musorService.musor(this.route.snapshot.params.id).subscribe(response => {
      this.musor = response.musor;
    });
  }

  modositMusor() {
    this.musorService.modosit(this.musor)
      .subscribe(response => {
        console.log(response);
        if (response.musor) {
          console.log('siker');
        } else  {
          console.log('error');
        }
      });
  }

  torlesMusor() {
    this.musorService.torles(this.musor.id)
      .subscribe(response => {
        console.log(response);
        if (response.musor) {
          console.log('siker');
          this.router.navigate(['/admin/musorok']);
        } else  {
          console.log('error');
        }
      });
  }

}
