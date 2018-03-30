import { Component, ElementRef, OnInit, ViewChild, NgZone, Renderer2 } from '@angular/core';
import { Musor } from '../interfaces/Musor';
import { MusorService } from '../services/musor.service';

declare const MediaElementPlayer: any;

@Component({
  selector: 'app-elo-adas',
  templateUrl: './elo-adas.component.html',
  styleUrls: ['./elo-adas.component.css']
})
export class EloAdasComponent implements OnInit {

  musorok: Musor[];
  musor: Musor;
  musorUrl: string;
  private streamUrl: string;
  private player;

  private play = {
    features: ['playpause', 'progress', 'current', 'duration', 'tracks', 'volume'],
    pluginPath: '/assets/mejs/swf/',
    success: function (mediaElement, originalNode) {
      console.log('Initialized');
    }
  };

  public now: Date = new Date();
  @ViewChild('cim')
  public musorCim: ElementRef;

  @ViewChild('leiras')
  public musorLeiras: ElementRef;

  constructor(private musorService: MusorService, private zone: NgZone, private renderer: Renderer2) {
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        this.now = new Date();
        const ora = this.now.getHours();
        const perc = this.now.getMinutes();

        // 7 - 10
        if (this.now.getHours() >= 7 && this.now.getHours() < 10) {
          if (this.now.getDay() >= 1 && this.now.getDay() <= 5) {
            this.musorUrl = 'utinform-idojaras';
          } else {
            this.musorUrl = 'ismetles';
          }
        // 10 - 15
        } else if (this.now.getHours() >= 10 && this.now.getHours() < 15) {
          this.musorUrl = 'ismetles';
        // 15 - 19
        } else if (this.now.getHours() >= 15 && this.now.getHours() < 19) {
          this.musorUrl = 'kepujsag';
        // 19 - 20
        } else if (this.now.getHours() >= 19 && this.now.getHours() < 20) {
          this.musorUrl = 'budai-hirado';
        // 20 - 21
        } else if (this.now.getHours() >= 20 && this.now.getHours() < 21) {
          if (this.now.getDay() === 1) {
            this.musorUrl = 'hegylako-magazin';
          } else if (this.now.getDay() === 2) {
            this.musorUrl = 'minosegi-ido';
          } else if (this.now.getDay() === 3) {
            this.musorUrl = 'kulturpont';
          } else if (this.now.getDay() === 4) {
            this.musorUrl = 'lelekemelo';
          } else if (this.now.getDay() === 5) {
            this.musorUrl = 'kek-hirek';
          } else if (this.now.getDay() === 6) {
            this.musorUrl = 'kommentar-nelkul';
          } else if (this.now.getDay() === 0) {
            this.musorUrl = 'alfa-es-omega';
          }
        // 23 - 7
        } else {
          this.musorUrl = 'budai-hirado';
        }

        this.musor = this.musorok.find(musor => {
          return this.musorUrl === musor.url;
        });

        this.renderer.setProperty(this.musorCim.nativeElement, 'textContent', this.musor.cim);
        this.renderer.setProperty(this.musorLeiras.nativeElement, 'textContent', this.musor.leiras);
      }, 1000);
    });
  }

  ngOnInit() {
    this.musorService.aktiv().subscribe(response => this.musorok = response.musorok);
    this.streamUrl = 'https://tv.hegyvidek.hu/stream_mpeg.flv';
    this.player = new MediaElementPlayer('player', this.play);
    this.player.setSrc(this.streamUrl);
    this.player.forceLive = true;
    this.player.load();
    // this.player.play();
  }



}
