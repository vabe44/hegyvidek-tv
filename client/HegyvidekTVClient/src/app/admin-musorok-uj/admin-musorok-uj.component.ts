import { Musor } from './../interfaces/Musor';
import { MusorService } from './../services/musor.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin-musorok-uj',
  templateUrl: './admin-musorok-uj.component.html',
  styleUrls: ['./admin-musorok-uj.component.css']
})
export class AdminMusorokUjComponent implements OnInit {

  // define the constant url we would be uploading to.
  URL = environment.apiUrl + '/musoraink/picture';
  public uploader: FileUploader = new FileUploader({url: this.URL, itemAlias: 'photo'});
  musor: Musor;
  urlUnique: boolean;
  constructor(
    private router: Router,
    private musorService: MusorService) {
      this.musor = {
        id: 0,
        cim: '',
        url: '',
        statusz: 'aktív',
        kep: '',
        leiras: '',
        createdDate: undefined,
        updatedDate: undefined,
        epizodok: []
      };
    }

  ngOnInit() {
    // override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.uploader.uploadAll();
    };
    // overide the onCompleteItem property of the uploader so we are
    // able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const filename = JSON.parse(response).file.filename;
      this.musor.kep = `${environment.apiUrl}/images/${filename}`;
      this.urlUnique = true;
    };
  }

  ujMusor() {
    this.musorService.uj(this.musor)
      .subscribe(response => {
        console.log(response);
        if (response.musor) {
          this.router.navigate(['/admin/musorok']);
        } else  {
          console.log('error');
        }
    });
  }

  toUrlFormat(text: string) {
    // Use hash map for special characters
    // tslint:disable-next-line:max-line-length
    const specialChars = {'à': 'a', 'ä': 'a', 'á': 'a', 'â': 'a', 'æ': 'a', 'å': 'a', 'ë': 'e', 'è': 'e', 'é': 'e', 'ê': 'e', 'î': 'i', 'ï': 'i', 'ì': 'i', 'í': 'i', 'ò': 'o', 'ó': 'o', 'ö': 'o', 'ő': 'o', 'ô': 'o', 'ø': 'o', 'ù': 'o', 'ú': 'u', 'ü': 'u', 'ű': 'u', 'û': 'u', 'ñ': 'n', 'ç': 'c', 'ß': 's', 'ÿ': 'y', 'œ': 'o', 'ŕ': 'r', 'ś': 's', 'ń': 'n', 'ṕ': 'p', 'ẃ': 'w', 'ǵ': 'g', 'ǹ': 'n', 'ḿ': 'm', 'ǘ': 'u', 'ẍ': 'x', 'ź': 'z', 'ḧ': 'h', '·': '-', '/': '-', '_': '-', ',': '-', ':': '-', ';': '-'};

    this.musor.url = text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/./g, (target, index, str) => specialChars[target] || target) // Replace special characters using the hash map
      .replace(/&/g, '-and-')         // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');             // Trim - from end of text
    this.musorService.isUrlUnique(this.musor.url)
      .subscribe(response => {
        if (response.unique) {
          this.urlUnique = true;
        } else  {
          this.urlUnique = false;
        }
    });
  }
}
