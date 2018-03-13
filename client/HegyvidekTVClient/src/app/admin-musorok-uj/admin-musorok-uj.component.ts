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
  URL = 'http://localhost:3000/musoraink/picture';
  public uploader: FileUploader = new FileUploader({url: this.URL, itemAlias: 'photo'});
  musor: Musor;
  constructor(
    private router: Router,
    private musorService: MusorService) {
      this.musor = {
        id: 0,
        cim: '',
        url: '',
        statusz: 'aktív',
        kep: '',
        leiras: ''
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
}
