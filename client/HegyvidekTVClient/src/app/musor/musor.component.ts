import { DatumPipe } from './../pipes/datum.pipe';
import { Component, OnInit } from '@angular/core';
import { Musor } from '../interfaces/Musor';
import { Router, ActivatedRoute } from '@angular/router';
import { MusorService } from '../services/musor.service';
import { Epizod } from '../interfaces/Epizod';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-musor',
  templateUrl: './musor.component.html',
  styleUrls: ['./musor.component.css'],
  providers: [ DatumPipe ]
})
export class MusorComponent implements OnInit {

  musor: Musor;
  epizod: Epizod;

  constructor(
    private router: Router,
    private musorService: MusorService,
    private route: ActivatedRoute,
    public datumPipe: DatumPipe) {}

    ngOnInit() {
      Observable.combineLatest([
        this.route.paramMap,
        this.route.queryParamMap
      ]);

      this.route.paramMap.subscribe(params => {
        this.musorService.musorUrl(params.get('musor')).subscribe(response => {
          this.musor = response.musor;
          if (params.get('epizod')) {
            // console.log(params.get('epizod'));
            this.epizod = this.musor.epizodok.find(epizod => {
              return epizod.url === params.get('epizod');
            });
          } else {
            this.epizod = this.musor.epizodok[0];
          }
          // console.log(response);
        });
      });
    }

}
