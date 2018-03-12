import { Component, OnInit } from '@angular/core';
import { HirService } from '../services/hir.service';
import { Hir } from '../interfaces/Hir';

@Component({
  selector: 'app-admin-hirek',
  templateUrl: './admin-hirek.component.html',
  styleUrls: ['./admin-hirek.component.css']
})
export class AdminHirekComponent implements OnInit {

  hirek: Hir[];
  ujHir: Hir;
  constructor(private hirService: HirService) {
    this.ujHir = {
      id: 0,
      szoveg: '',
      statusz: 'aktiv'
    };
  }

  ngOnInit() {
    this.hirService.osszes().subscribe(response => this.hirek = response.hirek);
  }

  letrehozHir(hir) {
    this.hirService.uj(hir)
      .subscribe(response => {
        console.log(response);
        if (response.hir) {
          alert('whoo hoo! im saved boys');
        } else  {
          console.log('error');
        }
      });
  }

  modositHir(hir) {
    this.hirService.modosit(hir)
      .subscribe(response => {
        console.log(response);
        if (response.hir) {
          console.log('siker');
        } else  {
          console.log('error');
        }
      });
  }

  torlesHir(hir) {
    this.hirService.torles(hir.id)
      .subscribe(response => {
        console.log(response);
        if (response.hir) {
          console.log('siker');
          this.hirek.splice(this.hirek.indexOf(hir), 1);
        } else  {
          console.log('error');
        }
      });
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
