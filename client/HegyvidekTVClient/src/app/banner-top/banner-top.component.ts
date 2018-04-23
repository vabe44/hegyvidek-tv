import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { BannerService } from '../services/banner.service';
import { Banner } from '../interfaces/Banner';

@Component({
  selector: 'app-banner-top',
  templateUrl: './banner-top.component.html',
  styleUrls: ['./banner-top.component.css']
})
export class BannerTopComponent implements OnInit {

  bannerek: Banner[];
  banner: Banner;
  constructor(private bannerService: BannerService) { }

  ngOnInit() {
    this.bannerService.ervenyesBannerek().subscribe(response => {
      this.bannerek = response.bannerek.filter(banner => banner.pozicio === 'felső');
      this.banner = this.bannerek[this.getRandomInt(this.bannerek.length)];
      this.banner.kep = environment.url + this.banner.kep;
    });
  }

  getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
