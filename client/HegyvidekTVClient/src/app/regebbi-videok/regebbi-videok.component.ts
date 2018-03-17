import { Component, OnInit, Input } from '@angular/core';
import { Epizod } from '../interfaces/Epizod';

@Component({
  selector: 'app-regebbi-videok',
  templateUrl: './regebbi-videok.component.html',
  styleUrls: ['./regebbi-videok.component.css']
})
export class RegebbiVideokComponent implements OnInit {

  @Input() epizodok: Epizod[];

  page: number;
  pageSize: number;
  maxPageSize: number;
  filteredEpizodok: Epizod[];
  constructor() {
    this.page = 1;
    this.pageSize = 6;
  }

  ngOnInit() {
    this.filteredEpizodok = this.paginate(this.epizodok, this.pageSize, this.page);
    this.maxPageSize = this.epizodok.length / this.pageSize;
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
