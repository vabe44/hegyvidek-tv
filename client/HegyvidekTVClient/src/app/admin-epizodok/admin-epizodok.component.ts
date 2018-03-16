import { Component, OnInit } from '@angular/core';
import { Epizod } from '../interfaces/Epizod';
import { EpizodService } from '../services/epizod.service';
import { YoutubeEmbedPipe } from '../pipes/youtube-embed.pipe';

@Component({
  selector: 'app-admin-epizodok',
  templateUrl: './admin-epizodok.component.html',
  styleUrls: ['./admin-epizodok.component.css'],
  providers: [ YoutubeEmbedPipe ]
})
export class AdminEpizodokComponent implements OnInit {

  epizodok: Epizod[];
  constructor(private epizodService: EpizodService, public youtubeEmbed: YoutubeEmbedPipe) { }

  ngOnInit() {
    this.epizodService.osszes().subscribe(response => this.epizodok = response.epizodok);
  }

}
