import { Component, OnInit } from '@angular/core';
import { HirService } from '../services/hir.service';
import { Hir } from '../interfaces/Hir';

@Component({
  selector: 'app-hirek-scroller',
  templateUrl: './hirek-scroller.component.html',
  styleUrls: ['./hirek-scroller.component.css']
})
export class HirekScrollerComponent implements OnInit {

  hirek: Hir[] = [];
  text: string;

  constructor(private hirService: HirService) {
    // this.text = `marquee ${ this.hirek.length * 20 }s linear infinite`;
  }

  ngOnInit() {
    this.hirService.osszes().subscribe(response => {
      this.hirek = response.hirek.filter(hir => hir.statusz === 'aktív');
      this.text = `marquee ${ this.hirek.length * 20 }s linear infinite`;
    });
  }

}
