import { Component, ElementRef, ViewChild, NgZone, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public now: Date = new Date();
  @ViewChild('counter')
  public myCounter: ElementRef;

  constructor(private zone: NgZone, private renderer: Renderer2) {
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        this.now = new Date();
        const perc = this.now.getMinutes() < 10 ? '0' + this.now.getMinutes() : this.now.getMinutes();
        const ido = `${this.now.getHours()}:${perc}`;
        this.renderer.setProperty(this.myCounter.nativeElement, 'textContent', ido);
      }, 1);
    });
  }

}
