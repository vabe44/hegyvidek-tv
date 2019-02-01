import { Component, OnInit } from '@angular/core';
import { MediaajanlatService } from '../services/mediaajanlat.service';

@Component({
  selector: 'app-mediaajanlat',
  templateUrl: './mediaajanlat.component.html',
  styleUrls: ['./mediaajanlat.component.css']
})
export class MediaajanlatComponent implements OnInit {
  markdownText: string;
  constructor(private mediaajanlatService: MediaajanlatService) { }

  ngOnInit() {
    this.mediaajanlatService.getMediaajanlat().subscribe(response => {
      this.markdownText = response.mediaajanlat;
      console.log(this.markdownText)
    });
  }

}
