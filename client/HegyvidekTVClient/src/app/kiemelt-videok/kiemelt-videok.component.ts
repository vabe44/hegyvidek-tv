import { EpizodService } from './../services/epizod.service';
import { Component, OnInit } from '@angular/core';
import { Epizod } from '../interfaces/Epizod';

@Component({
  selector: 'app-kiemelt-videok',
  templateUrl: './kiemelt-videok.component.html',
  styleUrls: ['./kiemelt-videok.component.css']
})
export class KiemeltVideokComponent implements OnInit {

  epizodok: Epizod[];
  page: number;
  pageSize: number;
  maxPageSize: number;
  filteredEpizodok: Epizod[];
  constructor(private epizodService: EpizodService) {
    this.page = 1;
    this.pageSize = 4;
  }

  ngOnInit() {
    this.epizodService.osszes().subscribe(response => {
      this.epizodok = response.epizodok.filter(epizod => epizod.statusz === 'aktív' && epizod.kiemelt);
      this.filteredEpizodok = this.paginate(this.epizodok, this.pageSize, this.page);
      this.maxPageSize = this.epizodok.length / this.pageSize;
    });
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
