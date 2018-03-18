import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Epizod } from '../interfaces/Epizod';
import { EpizodService } from '../services/epizod.service';

@Component({
  selector: 'app-kereses-talalatok',
  templateUrl: './kereses-talalatok.component.html',
  styleUrls: ['./kereses-talalatok.component.css']
})
export class KeresesTalalatokComponent implements OnInit {

  epizodok: Epizod[];
  filterBy: string;
  orderBy: string;
  page: number;
  pageSize: number;
  maxPageSize: number;
  filteredEpizodok: Epizod[];
  constructor(private epizodService: EpizodService) {
    this.page = 1;
    this.pageSize = 6;
  }

  ngOnInit() {
    this.epizodService.osszes().subscribe(response => {
      this.epizodok = response.epizodok;
      this.filteredEpizodok = this.paginate(this.epizodok, this.pageSize, this.page);
      this.maxPageSize = this.epizodok.length / this.pageSize;
      this.filterBy = 'datum';
      this.orderBy = 'desc';
      this.sort();
    });
  }

  sort() {
    if (this.orderBy === 'desc') {
      this.epizodok = this.epizodok.sort((a, b) => b[this.filterBy].localeCompare(a[this.filterBy]));
      this.filteredEpizodok = this.paginate(this.epizodok, this.pageSize, this.page);
    } else {
      this.epizodok = this.epizodok.sort((a, b) => a[this.filterBy].localeCompare(b[this.filterBy]));
      this.filteredEpizodok = this.paginate(this.epizodok, this.pageSize, this.page);
    }
  }

  ujabb() {
    this.page--;
    this.filteredEpizodok = this.paginate(this.epizodok, this.pageSize, this.page);
  }

  regebbi() {
    this.page++;
    this.filteredEpizodok = this.paginate(this.epizodok, this.pageSize, this.page);
  }

  paginate(array, page_size, page_number) {
    --page_number; // because pages logically start with 1, but technically with 0
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  }

}
