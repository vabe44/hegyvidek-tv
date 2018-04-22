import { Component, OnInit } from '@angular/core';
import { Epizod } from '../interfaces/Epizod';
import { EpizodService } from '../services/epizod.service';
import { YoutubeEmbedPipe } from '../pipes/youtube-embed.pipe';
import { MusorService } from '../services/musor.service';
import { Musor } from '../interfaces/Musor';

@Component({
  selector: 'app-admin-epizodok',
  templateUrl: './admin-epizodok.component.html',
  styleUrls: ['./admin-epizodok.component.css'],
  providers: [ YoutubeEmbedPipe ]
})
export class AdminEpizodokComponent implements OnInit {

  filterBy: number;
  orderBy: string;
  epizodok: Epizod[];
  filteredEpizodok: Epizod[];
  musorok: Musor[];
  constructor(private epizodService: EpizodService, private musorService: MusorService, public youtubeEmbed: YoutubeEmbedPipe) {
    this.filterBy = -1;
  }

  ngOnInit() {
    this.epizodService.osszes().subscribe(response => {
      this.epizodok = response.epizodok;
      this.filteredEpizodok = this.epizodok;
    });
    this.musorService.osszes().subscribe(response => this.musorok = response.musorok);
  }

  sort() {
    if (this.filterBy <= 0) {
      this.filteredEpizodok = this.epizodok;
    } else {
      this.filteredEpizodok = this.epizodok.filter(epizod => epizod.musor.id === Number(this.filterBy));
    }
  }
}
