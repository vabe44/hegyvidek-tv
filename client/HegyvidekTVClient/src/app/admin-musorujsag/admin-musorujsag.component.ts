import { MusorujsagService } from './../services/musorujsag.service';
import { Component, OnInit } from '@angular/core';
import { Musorujsag } from '../interfaces/Musorujsag';

@Component({
  selector: 'app-admin-musorujsag',
  templateUrl: './admin-musorujsag.component.html',
  styleUrls: ['./admin-musorujsag.component.css']
})
export class AdminMusorujsagComponent implements OnInit {

  adas: Musorujsag;
  hetfoiAdasok: Musorujsag[];
  keddiAdasok: Musorujsag[];
  szerdaiAdasok: Musorujsag[];
  csutortokiAdasok: Musorujsag[];
  pentekiAdasok: Musorujsag[];
  szombatiAdasok: Musorujsag[];
  vasarnapiAdasok: Musorujsag[];
  constructor(private musorujsagService: MusorujsagService) {
    this.adas = {
      id: 0,
      sorrend: 0,
      nap: 1,
      adascim: '',
      link: '',
      aktivEttol: undefined,
      aktivEddig: undefined,
      // musor: this.musor,
      createdDate: undefined,
      updatedDate: undefined
    };
  }

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

  letrehozAdas() {
    console.log(this.adas);
    this.musorujsagService.uj(this.adas)
      .subscribe(response => {
        alert(response.message);
        if (response.musorujsag) {
          // tslint:disable-next-line:triple-equals
          if (response.musorujsag.nap == 1) {
            this.hetfoiAdasok.push(response.musorujsag);
          // tslint:disable-next-line:triple-equals
          } else if (response.musorujsag.nap == 2) {
            this.keddiAdasok.push(response.musorujsag);
          // tslint:disable-next-line:triple-equals
          } else if (response.musorujsag.nap == 3) {
            this.szerdaiAdasok.push(response.musorujsag);
          // tslint:disable-next-line:triple-equals
          } else if (response.musorujsag.nap == 4) {
            this.csutortokiAdasok.push(response.musorujsag);
          // tslint:disable-next-line:triple-equals
          } else if (response.musorujsag.nap == 5) {
            this.pentekiAdasok.push(response.musorujsag);
          // tslint:disable-next-line:triple-equals
          } else if (response.musorujsag.nap == 6) {
            this.szombatiAdasok.push(response.musorujsag);
          // tslint:disable-next-line:triple-equals
          } else if (response.musorujsag.nap == 7) {
            this.vasarnapiAdasok.push(response.musorujsag);
          }
          this.adas.sorrend++;
          this.adas.adascim = '';
          this.adas.link = '';
          this.adas.aktivEttol = this.adas.aktivEddig;
        }
      });
  }

  modositAdas(adas) {
    this.musorujsagService.modosit(adas)
      .subscribe(response => {
        alert(response.message);
      });
  }

  torlesAdas(adas) {
    const shouldDelete = confirm('Biztos benne, hogy törölni akarja az adást?');
    if (shouldDelete) {
      this.musorujsagService.torles(adas.id)
        .subscribe(response => {
          console.log(response);
          if (response.musorujsag) {
            console.log('siker');
            // tslint:disable-next-line:triple-equals
            if (response.musorujsag.nap == 1) {
              this.hetfoiAdasok.splice(this.hetfoiAdasok.indexOf(adas), 1);
            // tslint:disable-next-line:triple-equals
            } else if (response.musorujsag.nap == 2) {
              this.keddiAdasok.splice(this.keddiAdasok.indexOf(adas), 1);
            // tslint:disable-next-line:triple-equals
            } else if (response.musorujsag.nap == 3) {
              this.szerdaiAdasok.splice(this.szerdaiAdasok.indexOf(adas), 1);
            // tslint:disable-next-line:triple-equals
            } else if (response.musorujsag.nap == 4) {
              this.csutortokiAdasok.splice(this.csutortokiAdasok.indexOf(adas), 1);
            // tslint:disable-next-line:triple-equals
            } else if (response.musorujsag.nap == 5) {
              this.pentekiAdasok.splice(this.pentekiAdasok.indexOf(adas), 1);
            // tslint:disable-next-line:triple-equals
            } else if (response.musorujsag.nap == 6) {
              this.szombatiAdasok.splice(this.szombatiAdasok.indexOf(adas), 1);
            // tslint:disable-next-line:triple-equals
            } else if (response.musorujsag.nap == 7) {
              this.vasarnapiAdasok.splice(this.vasarnapiAdasok.indexOf(adas), 1);
            }
          } else {
            console.log('error');
          }
        });
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  filterAdas(adas: Musorujsag, nap: number) {
    return adas.nap === nap;
  }
}
