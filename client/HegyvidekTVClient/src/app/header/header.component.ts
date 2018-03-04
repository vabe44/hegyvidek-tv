import { Component, ElementRef, ViewChild, NgZone, Renderer2 } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public facebookLink = environment.facebook;
  public youtubeLink = environment.youtube;
  public now: Date = new Date();
  @ViewChild('ido')
  public aktualisIdo: ElementRef;

  constructor(private zone: NgZone, private renderer: Renderer2) {
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        this.now = new Date();
        const ora = this.now.getHours() < 10 ? '0' + this.now.getHours() : this.now.getHours();
        const perc = this.now.getMinutes() < 10 ? '0' + this.now.getMinutes() : this.now.getMinutes();
        const ido = `${ora}:${perc}`;
        this.renderer.setProperty(this.aktualisIdo.nativeElement, 'textContent', ido);
      }, 1);
    });
  }

}
