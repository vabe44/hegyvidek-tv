import { Musor } from './../interfaces/Musor';
import { MusorService } from './../services/musor.service';
import { EpizodService } from './../services/epizod.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment';
import { Epizod } from '../interfaces/Epizod';

@Component({
  selector: 'app-admin-epizodok-modosit',
  templateUrl: './admin-epizodok-modosit.component.html',
  styleUrls: ['./admin-epizodok-modosit.component.css']
})
export class AdminEpizodokModositComponent implements OnInit {

  // define the constant url we would be uploading to.
  URL = 'http://localhost:3000/epizodok/video';
  public uploader: FileUploader = new FileUploader({url: this.URL, itemAlias: 'video'});
  epizod: any = {};
  musor: Musor;
  musorok: Musor[];
  constructor(
    private router: Router,
    private epizodService: EpizodService, private musorService: MusorService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.epizodService.epizod(this.route.snapshot.params.id).subscribe(response => {
      this.epizod = response.epizod;
    });
    this.musorService.osszes().subscribe(response => this.musorok = response.musorok);
    // override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.uploader.uploadAll();
    };
    // overide the onCompleteItem property of the uploader so we are
    // able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(response);
      const filename = JSON.parse(response).file.filename;
      this.epizod.video = filename;
    };
  }

  uploadYouTube() {
    this.epizodService.youtube(this.epizod).subscribe(res => {
      console.log(res);
      this.epizod.youtube = res.data.id;
    });
  }

  modositEpizod() {
    this.epizodService.modosit(this.epizod)
      .subscribe(response => {
        console.log(response);
        if (response.epizod) {
          this.router.navigate(['/admin/epizodok']);
        } else  {
          console.log('error');
        }
    });
  }

  torlesEpizod() {
    this.epizodService.torles(this.epizod.id)
      .subscribe(response => {
        console.log(response);
        if (response.epizod) {
          console.log('siker');
          this.router.navigate(['/admin/epizodok']);
        } else  {
          console.log('error');
        }
      });
  }

}
