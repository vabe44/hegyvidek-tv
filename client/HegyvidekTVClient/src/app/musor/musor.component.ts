import { Component, OnInit } from '@angular/core';
import { Musor } from '../interfaces/Musor';
import { Router, ActivatedRoute } from '@angular/router';
import { MusorService } from '../services/musor.service';

@Component({
  selector: 'app-musor',
  templateUrl: './musor.component.html',
  styleUrls: ['./musor.component.css']
})
export class MusorComponent implements OnInit {

  musor: Musor;
  constructor(
    private router: Router,
    private musorService: MusorService, private route: ActivatedRoute) {}

    ngOnInit() {

      this.route.paramMap.subscribe(params => {
        this.musorService.musorUrl(params.get('musor')).subscribe(response => {
          this.musor = response.musor;
          console.log(response);
        });
      });
    }

}
