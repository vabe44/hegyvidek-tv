import { Component, OnInit, QueryList, ViewChildren, ElementRef, AfterViewInit, Renderer, NgZone } from '@angular/core';
import { BannerService } from '../services/banner.service';
import { Banner } from '../interfaces/Banner';

@Component({
  selector: 'app-banner-top',
  templateUrl: './banner-top.component.html',
  styleUrls: ['./banner-top.component.css']
})
export class BannerTopComponent implements OnInit, AfterViewInit {

  // @ViewChildren('slide')
  // slideElements: QueryList<ElementRef>;
  // slides: ElementRef[];
  bannerek: Banner[];
  // currentSlide = 0;
  constructor(private bannerService: BannerService, private elementRef: ElementRef, private renderer: Renderer, private zone: NgZone) { }

  ngOnInit() {
    this.bannerService.osszes().subscribe(response => {
      this.bannerek = response.bannerek;
      console.log(this.bannerek);
      this.zone.runOutsideAngular(() => {
        const slides = document.querySelectorAll('#slides .slide');
        console.log(slides);
        let currentSlide = 0;
        const slideInterval = setInterval(nextSlide, 5000);

        function nextSlide() {
          slides[currentSlide].className = 'slide';
          currentSlide = (currentSlide + 1) % slides.length;
          slides[currentSlide].className = 'slide showing';
        }
      });
      // const slides = document.querySelectorAll('#slides .slide');
      // console.log(slides);
      // let currentSlide = 0;
      // const slideInterval = setInterval(nextSlide, 5000);

      // function nextSlide() {
      //   slides[currentSlide].className = 'slide';
      //   currentSlide = (currentSlide + 1) % slides.length;
      //   slides[currentSlide].className = 'slide showing';
      // }
    });
  }

  ngAfterViewInit() {
    // const slides = document.querySelectorAll('#slides .slide');
    // let currentSlide = 0;
    // const slideInterval = setInterval(nextSlide, 5000);

    // function nextSlide() {
    //   slides[currentSlide].className = 'slide';
    //   currentSlide = (currentSlide + 1) % slides.length;
    //   slides[currentSlide].className = 'slide showing';
    // }
  }
}
