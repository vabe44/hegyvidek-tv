import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { Epizod } from '../interfaces/Epizod';
import { Musor } from '../interfaces/Musor';

@Component({
  selector: 'app-regebbi-videok',
  templateUrl: './regebbi-videok.component.html',
  styleUrls: ['./regebbi-videok.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegebbiVideokComponent implements OnInit, OnChanges {

  @Input() musor: Musor;
  epizodok: Epizod[];
  page: number;
  pageSize: number;
  maxPageSize: number;
  filteredEpizodok: Epizod[];
  constructor() {
    this.page = 1;
    this.pageSize = 6;
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    // console.log(changes);
    this.epizodok = this.musor.epizodok.sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime()).slice();
    this.filteredEpizodok = this.paginate(this.epizodok, this.pageSize, this.page);
    this.maxPageSize = this.epizodok.length / this.pageSize;
  }

  ngOnInit() {
    this.epizodok = this.musor.epizodok.sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime()).slice();
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
