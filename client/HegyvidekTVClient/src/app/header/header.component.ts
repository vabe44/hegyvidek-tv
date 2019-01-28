import { Component, ElementRef, ViewChild, NgZone, Renderer2, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Banner } from '../interfaces/Banner';
import { BannerService } from '../services/banner.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public facebookLink = environment.facebook;
  public youtubeLink = environment.youtube;
  public now: Date = new Date();
  showPopup: boolean;
  @ViewChild('ido')
  public aktualisIdo: ElementRef;
  bannerek: Banner[];
  banner: Banner;

  constructor(private zone: NgZone, private renderer: Renderer2, private bannerService: BannerService) {
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        this.now = new Date();
        const ora = this.now.getHours() < 10 ? '0' + this.now.getHours() : this.now.getHours();
        const perc = this.now.getMinutes() < 10 ? '0' + this.now.getMinutes() : this.now.getMinutes();
        const ido = `${ora}:${perc}`;
        this.renderer.setProperty(this.aktualisIdo.nativeElement, 'textContent', ido);
      }, 1000);
    });
  }

  ngOnInit() {
    this.bannerService.ervenyesBannerek().subscribe(async response => {
      this.bannerek = response.bannerek.filter(banner => banner.pozicio === 'popup');
      this.banner = this.bannerek[this.getRandomInt(this.bannerek.length)];
      this.banner.kep = environment.url + this.banner.kep;
      await this.delay(this.banner.popupShowDelay);
      this.showPopup = true;
      await this.delay(this.banner.popupAutocloseTime);
      this.showPopup = false;
      console.log(this.bannerek);
    });
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
