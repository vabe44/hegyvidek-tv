import { YoutubeService } from './../services/youtube.service';
import { YouTube } from './../interfaces/YouTube';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-youtube-auth',
  templateUrl: './admin-youtube-auth.component.html',
  styleUrls: ['./admin-youtube-auth.component.css']
})
export class AdminYoutubeAuthComponent implements OnInit {

  oauthUrl: string;
  youtube: YouTube;
  constructor(private youtubeService: YoutubeService) {
  }

  ngOnInit() {
    this.youtubeService.beallitasok().subscribe(response => this.youtube = response.youtube);
    this.oauthUrl = 'http://localhost:3000/youtube/oauth';
  }

  frissites() {
    this.youtubeService.frissites(this.youtube)
      .subscribe(response => {
        console.log(response);
        if (response.youtube) {
          console.log('siker');
        } else  {
          console.log('error');
        }
      });
  }

  torles() {
    this.youtubeService.torles()
    .subscribe(response => {
      console.log(response);
      if (response.youtube) {
        this.youtube = response.youtube;
        console.log('siker');
      } else  {
        console.log('error');
      }
    });
  }

}
