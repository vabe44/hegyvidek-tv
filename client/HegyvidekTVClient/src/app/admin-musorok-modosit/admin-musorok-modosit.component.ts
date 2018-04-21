import { MusorujsagService } from './../services/musorujsag.service';
import { Component, OnInit } from '@angular/core';
import { MusorService } from '../services/musor.service';
import { Musor } from '../interfaces/Musor';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment';
import { Musorujsag } from '../interfaces/Musorujsag';

@Component({
  selector: 'app-admin-musorok-modosit',
  templateUrl: './admin-musorok-modosit.component.html',
  styleUrls: ['./admin-musorok-modosit.component.css']
})
export class AdminMusorokModositComponent implements OnInit {

  musor: any = {};
  adas: Musorujsag;
  adasok: Musorujsag[];
  // define the constant url we would be uploading to.
  URL = environment.apiUrl + '/musoraink/picture';
  public uploader: FileUploader = new FileUploader({url: this.URL, itemAlias: 'photo'});
  urlUnique: boolean;
  constructor(
  private router: Router,
  private route: ActivatedRoute,
  private musorService: MusorService,
  private musorujsagService: MusorujsagService) {}

  ngOnInit() {
    this.musorService.musor(this.route.snapshot.params.id).subscribe(response => {
      this.musor = response.musor;
      this.adas = {
        id: 0,
        nap: 1,
        aktivEttol: undefined,
        aktivEddig: undefined,
        musor: this.musor,
        createdDate: undefined,
        updatedDate: undefined
      };
      this.musorujsagService.musor(this.musor.id).subscribe(response2 => this.adasok = response2.adasok);
    });
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
    };
    this.urlUnique = true;
  }

  modositMusor() {
    this.musorService.modosit(this.musor)
      .subscribe(response => {
        console.log(response);
        if (response.musor) {
          console.log('siker');
          this.router.navigate(['/admin/musorok']);
        } else  {
          console.log('error');
        }
      });
  }

  torlesMusor() {
    this.musorService.torles(this.musor.id)
      .subscribe(response => {
        console.log(response);
        if (response.musor) {
          console.log('siker');
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

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  letrehozAdas() {
    console.log(this.adas);
    this.musorujsagService.uj(this.adas)
      .subscribe(response => {
        console.log(response);
        if (response.musorujsag) {
          this.adasok.unshift(response.musorujsag);
          this.adas = {
            id: 0,
            nap: 1,
            aktivEttol: undefined,
            aktivEddig: undefined,
            musor: this.musor,
            createdDate: undefined,
            updatedDate: undefined
          };
        } else {
          alert(response.message);
        }
        if (this.adas.id === 0) {
          // this.musorujsag.unshift(response.musorujsag);
        }
      });
  }

  modositAdas(adas) {
    this.musorujsagService.modosit(adas)
      .subscribe(response => {
        alert(response.message);
      });
  }

  torlesAdas(adas) {
    const shouldDelete = confirm('Biztos benne, hogy törölni akarja az adást?');
    if (shouldDelete) {
      this.musorujsagService.torles(adas.id)
        .subscribe(response => {
          console.log(response);
          if (response.musorujsag) {
            console.log('siker');
            this.adasok.splice(this.adasok.indexOf(adas), 1);
          } else  {
            console.log('error');
          }
        });
    }
  }
}
