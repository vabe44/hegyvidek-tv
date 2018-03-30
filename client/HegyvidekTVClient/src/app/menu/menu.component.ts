import { Component, OnInit } from '@angular/core';
import { Musor } from '../interfaces/Musor';
import { MusorService } from '../services/musor.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currentUrl: string;
  musorok: Musor[];
  constructor(private router: Router, private musorService: MusorService) { }

  ngOnInit() {
    this.musorService.aktiv().subscribe(response => this.musorok = response.musorok);
    this.router.events.subscribe((res) => {
      // console.log(this.router.url, 'Current URL');
      this.currentUrl = this.router.url;
    });
  }

}
