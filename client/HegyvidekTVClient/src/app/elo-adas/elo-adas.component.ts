import { Component, OnInit } from '@angular/core';

declare const MediaElementPlayer: any;

@Component({
  selector: 'app-elo-adas',
  templateUrl: './elo-adas.component.html',
  styleUrls: ['./elo-adas.component.css']
})
export class EloAdasComponent implements OnInit {

  private streamUrl: string;
  private player;

  private play = {
    features: ['playpause', 'progress', 'current', 'duration', 'tracks', 'volume'],
    pluginPath: '/assets/mejs/swf/',
    success: function (mediaElement, originalNode) {
      console.log('Initialized');
    }
  };

  constructor() { }

  ngOnInit() {
    this.streamUrl = 'http://tv.hegyvidek.hu/stream_mpeg.flv';
    this.player = new MediaElementPlayer('player', this.play);
    this.player.setSrc(this.streamUrl);
    this.player.forceLive = true;
    this.player.load();
    // this.player.play();
  }

}
