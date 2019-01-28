import { Component, OnInit } from '@angular/core';
import { BannerService } from '../services/banner.service';
import { Banner } from '../interfaces/Banner';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin-bannerek',
  templateUrl: './admin-bannerek.component.html',
  styleUrls: ['./admin-bannerek.component.css']
})
export class AdminBannerekComponent implements OnInit {

  // define the constant url we would be uploading to.
  URL = environment.apiUrl + '/musoraink/picture';
  kepUrl: string;
  public uploader: FileUploader = new FileUploader({url: this.URL, itemAlias: 'photo'});
  bannerek: Banner[];
  banner: Banner;
  constructor(private bannerService: BannerService) {
    this.banner = {
      id: 0,
      nev: '',
      aktivEttol: undefined,
      aktivEddig: undefined,
      statusz: 'aktív',
      tipus: 'kep',
      kep: '',
      keplink: '',
      embedkod: '',
      pozicio: 'felső',
      popupShowDelay: 4000,
      popupAutocloseTime: 5000,
      createdDate: undefined,
      updatedDate: undefined
    };
  }

  ngOnInit() {
    this.bannerService.osszes().subscribe(response => this.bannerek = response.bannerek);
    // override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.uploader.uploadAll();
    };
    // overide the onCompleteItem property of the uploader so we are
    // able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const filename = JSON.parse(response).file.filename;
      this.banner.kep = `/images/${filename}`;
      this.kepUrl = `${environment.url}/images/${filename}`;
    };
  }

  letrehozBanner() {
    this.bannerService.uj(this.banner)
      .subscribe(response => {
        alert(response.message);
        if (response.banner) {
          this.banner = {
            id: 0,
            nev: '',
            aktivEttol: undefined,
            aktivEddig: undefined,
            statusz: 'aktív',
            tipus: 'kep',
            kep: '',
            keplink: '',
            embedkod: '',
            pozicio: 'felső',
            popupShowDelay: 4000,
            popupAutocloseTime: 5000,
            createdDate: undefined,
            updatedDate: undefined
          };
        }
        if (this.banner.id === 0) {
          this.bannerek.unshift(response.banner);
        }
      });
  }

  modositBanner(banner) {
    this.banner = banner;
  }

  frissitBanner() {
    this.bannerService.modosit(this.banner)
    .subscribe(response => {
      alert(response.message);
    });
  }

  letrehozOrFrissitBanner() {
    if (this.banner.id === 0) {
      this.letrehozBanner();
    } else {
      this.frissitBanner();
    }
  }

  torlesBanner(banner) {
    const shouldDelete = confirm('Biztos benne, hogy törölni akarja a bannert?');
    if (shouldDelete) {
      this.bannerService.torles(banner.id)
        .subscribe(response => {
          alert(response.message);
          if (response.banner) {
            this.bannerek.splice(this.bannerek.indexOf(banner), 1);
            this.banner = {
              id: 0,
              nev: '',
              aktivEttol: undefined,
              aktivEddig: undefined,
              statusz: 'aktív',
              tipus: 'kep',
              kep: '',
              keplink: '',
              embedkod: '',
              pozicio: 'felső',
              popupShowDelay: 4000,
              popupAutocloseTime: 5000,
              createdDate: undefined,
              updatedDate: undefined
            };
          }
        });
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
