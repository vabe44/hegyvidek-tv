import { MusorujsagService } from './../services/musorujsag.service';
import { Component, ElementRef, OnInit, ViewChild, NgZone, Renderer2 } from '@angular/core';
import { Musor } from '../interfaces/Musor';
import { MusorService } from '../services/musor.service';
import { Musorujsag } from '../interfaces/Musorujsag';

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
  musorujsag: Musorujsag[];
  adas: Musorujsag;
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

  constructor(
    private musorService: MusorService, private musorujsagService: MusorujsagService,
    private zone: NgZone, private renderer: Renderer2) {
    // this.zone.runOutsideAngular(() => {
    //   setInterval(() => {
    //     this.adas = this.musorujsag.find(function(element) {
    //       const now = new Date();
    //       const month = now.getMonth() + 1;
    //       const month2 = month < 10 ? '0' + month : '' + month; // ('' + month) for string result
    //       const ettol = new Date(`${now.getFullYear()}-${month2}-${now.getDate()}T${element.aktivEttol}`);
    //       const eddig = new Date(`${now.getFullYear()}-${month2}-${now.getDate()}T${element.aktivEddig}`);
    //       return ettol <= new Date() && eddig >= new Date();
    //     });
    //     this.renderer.setProperty(this.musorCim.nativeElement, 'textContent', this.adas.adascim);
    //     // this.renderer.setProperty(this.musorLeiras.nativeElement, 'textContent', this.musor.leiras);
    //     this.renderer.setProperty(this.musorLeiras.nativeElement, 'textContent', '');
    //   }, 1000);
    // });
  }

  ngOnInit() {
    this.musorService.aktiv().subscribe(response => this.musorok = response.musorok);
    this.musorujsagService.osszes().subscribe(response => this.musorujsag = response.musorujsag);
    this.streamUrl = 'https://tv.hegyvidek.hu/stream_mpeg.flv';
    this.player = new MediaElementPlayer('player', this.play);
    this.player.setSrc(this.streamUrl);
    this.player.forceLive = true;
    this.player.load();
    // this.player.play();
  }

  getMonth(date) {
    const month = date.getMonth() + 1;
    return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
  }
}
