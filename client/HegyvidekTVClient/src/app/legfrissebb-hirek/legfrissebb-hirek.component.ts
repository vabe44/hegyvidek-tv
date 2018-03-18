import { Component, OnInit } from '@angular/core';
import { MusorService } from '../services/musor.service';
import { Epizod } from '../interfaces/Epizod';

@Component({
  selector: 'app-legfrissebb-hirek',
  templateUrl: './legfrissebb-hirek.component.html',
  styleUrls: ['./legfrissebb-hirek.component.css']
})
export class LegfrissebbHirekComponent implements OnInit {

  epizodok: Epizod[] = [];
  page: number;
  pageSize: number;
  maxPageSize: number;
  filteredEpizodok: Epizod[];

  constructor(private musorService: MusorService) {
    this.page = 1;
    this.pageSize = 3;
  }

  ngOnInit() {
    this.musorService.hirek().subscribe(response => {
      this.epizodok = response.musor.epizodok.filter(hir => hir.statusz === 'aktív');
      this.filteredEpizodok = this.paginate(this.epizodok, this.pageSize, this.page);
      this.maxPageSize = this.epizodok.length / this.pageSize;
    });
  }

  paginate(array, page_size, page_number) {
    --page_number; // because pages logically start with 1, but technically with 0
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  }

}
