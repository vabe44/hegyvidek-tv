import { Component, OnInit, QueryList, ViewChildren, ElementRef, AfterViewInit, Renderer } from '@angular/core';
import { BannerService } from '../services/banner.service';
import { Banner } from '../interfaces/Banner';

@Component({
  selector: 'app-banner-top',
  templateUrl: './banner-top.component.html',
  styleUrls: ['./banner-top.component.css']
})
export class BannerTopComponent implements OnInit {

  // @ViewChildren('slide')
  // slideElements: QueryList<ElementRef>;
  // slides: ElementRef[];
  bannerek: Banner[];
  // currentSlide = 0;
  constructor(private bannerService: BannerService, private elementRef: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    this.bannerService.osszes().subscribe(response => {
      this.bannerek = response.bannerek;
      console.log(this.bannerek);

      const slides = document.querySelectorAll('#slides .slide');
      let currentSlide = 0;
      const slideInterval = setInterval(nextSlide, 5000);

      function nextSlide() {
        slides[currentSlide].className = 'slide';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].className = 'slide showing';
      }
    });
  }

  // ngAfterViewInit() {
  //   console.log('--- using QueryList.first ---');
  //   const firstEl = this.slideElements.first;
  //   console.log(firstEl.nativeElement.innerHTML);

  //   this.slides = this.slideElements.toArray();
  //   const slideInterval = setInterval(this.nextSlide(this.renderer), 2000);
  // }
  // nextSlide(renderer: Renderer) {
  //   // this.slides[this.currentSlide].nativeElement = 'slide';
  //   renderer.setElementClass(this.slides[this.currentSlide].nativeElement, 'slide', true);
  //   this.currentSlide = (this.currentSlide + 1) % this.slideElements.length;
  //   renderer.setElementClass(this.slides[this.currentSlide].nativeElement, 'slide', true);
  //   renderer.setElementClass(this.slides[this.currentSlide].nativeElement, 'showing', true);
  //   // this.slideElements[this.currentSlide].className = 'slide showing';
  // }
}
