import { Component, OnInit } from '@angular/core';

declare const MediaElementPlayer: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
    this.player.play();
  }
}
