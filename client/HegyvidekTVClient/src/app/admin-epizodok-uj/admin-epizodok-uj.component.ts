import { Musor } from './../interfaces/Musor';
import { MusorService } from './../services/musor.service';
import { EpizodService } from './../services/epizod.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment';
import { Epizod } from '../interfaces/Epizod';

@Component({
  selector: 'app-admin-epizodok-uj',
  templateUrl: './admin-epizodok-uj.component.html',
  styleUrls: ['./admin-epizodok-uj.component.css']
})
export class AdminEpizodokUjComponent implements OnInit {

  // define the constant url we would be uploading to.
  URL = 'http://localhost:3000/epizodok/picture';
  public uploader: FileUploader = new FileUploader({url: this.URL, itemAlias: 'photo'});
  epizod: Epizod;
  musor: Musor;
  musorok: Musor[];
  constructor(
    private router: Router,
    private epizodService: EpizodService, private musorService: MusorService) {
      this.epizod = {
        id: 0,
        cim: '',
        url: '',
        statusz: 'aktív',
        kiemelt: false,
        datum: new Date(Date.now()),
        kep: '',
        youtube: '',
        leiras: '',
        musor: -1,
        video: ''
      };
    }

  ngOnInit() {
    this.musorService.osszes().subscribe(response => this.musorok = response.musorok);
    // override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.uploader.uploadAll();
    };
    // overide the onCompleteItem property of the uploader so we are
    // able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const filename = JSON.parse(response).file.filename;
      this.epizod.kep = `${environment.apiUrl}/images/${filename}`;
    };
  }

  ujEpizod() {
    this.epizodService.uj(this.epizod)
      .subscribe(response => {
        console.log(response);
        if (response.epizod) {
          this.router.navigate(['/admin/epizodok']);
        } else  {
          console.log('error');
        }
    });
  }

}
