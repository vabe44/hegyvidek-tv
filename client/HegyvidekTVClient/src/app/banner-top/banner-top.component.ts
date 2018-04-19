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
  constructor(private bannerService: BannerService) { }

  ngOnInit() {
    this.bannerService.osszes().subscribe(response => {
      this.bannerek = response.bannerek;
      console.log(this.bannerek);
    });
  }

}
