import { Component, OnInit } from '@angular/core';
import { Banner } from '../interfaces/Banner';
import { BannerService } from '../services/banner.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-banner-footer',
  templateUrl: './banner-footer.component.html',
  styleUrls: ['./banner-footer.component.css']
})
export class BannerFooterComponent implements OnInit {

  bannerek: Banner[];
  banner: Banner;
  constructor(private bannerService: BannerService) { }

  ngOnInit() {
    this.bannerService.ervenyesBannerek().subscribe(response => {
      this.bannerek = response.bannerek.filter(banner => banner.pozicio === 'alsó');
      this.banner = this.bannerek[this.getRandomInt(this.bannerek.length)];
      this.banner.kep = environment.url + this.banner.kep;
    });
  }

  getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
