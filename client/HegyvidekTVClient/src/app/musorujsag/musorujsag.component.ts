import { Component, OnInit } from '@angular/core';
import { MusorujsagService } from '../services/musorujsag.service';
import { Musorujsag } from '../interfaces/Musorujsag';

@Component({
  selector: 'app-musorujsag',
  templateUrl: './musorujsag.component.html',
  styleUrls: ['./musorujsag.component.css']
})
export class MusorujsagComponent implements OnInit {

  adasok: Musorujsag[];
  hetfoiAdasok: Musorujsag[];
  keddiAdasok: Musorujsag[];
  szerdaiAdasok: Musorujsag[];
  csutortokiAdasok: Musorujsag[];
  pentekiAdasok: Musorujsag[];
  szombatiAdasok: Musorujsag[];
  vasarnapiAdasok: Musorujsag[];
  constructor(private musorujsagService: MusorujsagService) { }

  ngOnInit() {
    this.musorujsagService.osszes().subscribe(response => {
      const adasok = response.musorujsag;
      this.hetfoiAdasok = adasok.filter(adas => adas.nap === 1);
      this.keddiAdasok = adasok.filter(adas => adas.nap === 2);
      this.szerdaiAdasok = adasok.filter(adas => adas.nap === 3);
      this.csutortokiAdasok = adasok.filter(adas => adas.nap === 4);
      this.pentekiAdasok = adasok.filter(adas => adas.nap === 5);
      this.szombatiAdasok = adasok.filter(adas => adas.nap === 6);
      this.vasarnapiAdasok = adasok.filter(adas => adas.nap === 7);
    });
  }

  filterAdas(adas: Musorujsag) {
    return adas.nap === 1;
  }
}
