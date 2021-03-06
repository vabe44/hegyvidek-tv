import { Musor } from './../interfaces/Musor';
import { MusorService } from './../services/musor.service';
import { EpizodService } from './../services/epizod.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment';
import { Epizod } from '../interfaces/Epizod';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-epizodok-uj',
  templateUrl: './admin-epizodok-uj.component.html',
  styleUrls: ['./admin-epizodok-uj.component.css']
})
export class AdminEpizodokUjComponent implements OnInit {

  // define the constant url we would be uploading to.
  URL = environment.apiUrl + '/epizodok/video';
  public uploader: FileUploader = new FileUploader({url: this.URL, itemAlias: 'video'});
  urlUnique: boolean;
  epizod: any = {};
  musor: Musor;
  musorok: Musor[];
  youtubeVideo: string;
  youtubeEmbed: SafeResourceUrl;
  dangerousVideoUrl: string;
  ytUploading: boolean;
  videoUploading: boolean;
  constructor(
    private router: Router,
    private epizodService: EpizodService,
    private musorService: MusorService,
    private sanitizer: DomSanitizer) {
      this.epizod = {
        id: 0,
        cim: '',
        url: '',
        statusz: 'aktív',
        kiemelt: 0,
        datum: new Date(Date.now()),
        kep: '',
        youtube: '',
        leiras: '',
        musor: {
          id: 0,
          cim: '',
          url: '',
          statusz: 'aktív',
          kep: '',
          leiras: '',
          createdDate: undefined,
          updatedDate: undefined
        },
        video: '',
        createdDate: undefined,
        updatedDate: undefined
      };
    }

  ngOnInit() {
    this.musorService.osszes().subscribe(response => {
      this.musorok = response.musorok;
      // this.epizod.musor = this.musorok[0];
    });
    // override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.uploader.uploadAll();
      this.videoUploading = true;
    };
    // overide the onCompleteItem property of the uploader so we are
    // able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const filename = JSON.parse(response).file.filename;
      this.epizod.video = filename;
      this.videoUploading = false;
    };
    this.youtubeVideo = 'link';
    this.ytUploading = false;
    this.videoUploading = false;
    this.urlUnique = true;
  }

  uploadYouTube() {
    this.epizodService.youtube(this.epizod).subscribe(res => {
      this.ytUploading = true;
      this.epizod.youtube = res.data.id;
      this.updateYoutubeVideoEmbedUrl(this.epizod.youtube);
      this.ytUploading = false;
    });
  }

  updateYoutubeVideoEmbedUrl(id: string) {
    // Appending an ID to a YouTube URL is safe.
    // Always make sure to construct SafeValue objects as
    // close as possible to the input data so
    // that it's easier to check if the value is safe.
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id + '?rel=0';
    this.youtubeEmbed = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }

  ujEpizod() {
    this.epizodService.uj(this.epizod)
      .subscribe(response => {
        alert(response.message);
        if (response.epizod) {
          this.router.navigate(['/admin/epizodok']);
        }
    });
  }

  toUrlFormat(text: string) {
    // Use hash map for special characters
    // tslint:disable-next-line:max-line-length
    const specialChars = {'à': 'a', 'ä': 'a', 'á': 'a', 'â': 'a', 'æ': 'a', 'å': 'a', 'ë': 'e', 'è': 'e', 'é': 'e', 'ê': 'e', 'î': 'i', 'ï': 'i', 'ì': 'i', 'í': 'i', 'ò': 'o', 'ó': 'o', 'ö': 'o', 'ő': 'o', 'ô': 'o', 'ø': 'o', 'ù': 'o', 'ú': 'u', 'ü': 'u', 'ű': 'u', 'û': 'u', 'ñ': 'n', 'ç': 'c', 'ß': 's', 'ÿ': 'y', 'œ': 'o', 'ŕ': 'r', 'ś': 's', 'ń': 'n', 'ṕ': 'p', 'ẃ': 'w', 'ǵ': 'g', 'ǹ': 'n', 'ḿ': 'm', 'ǘ': 'u', 'ẍ': 'x', 'ź': 'z', 'ḧ': 'h', '·': '-', '/': '-', '_': '-', ',': '-', ':': '-', ';': '-'};

    this.epizod.url = text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/./g, (target, index, str) => specialChars[target] || target) // Replace special characters using the hash map
      .replace(/&/g, '-and-')         // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');             // Trim - from end of text
    this.epizodService.isUrlUnique(this.epizod.url)
      .subscribe(response => {
        this.urlUnique = response.unique;
        if (!this.urlUnique) {
          this.epizod.url = `${this.epizod.url}-${this.epizod.id}`;
          this.toUrlFormat(this.epizod.url);
        }
    });
  }

}
