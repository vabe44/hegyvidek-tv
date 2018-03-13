import { Component, OnInit } from '@angular/core';
import { MusorService } from '../services/musor.service';
import { Musor } from '../interfaces/Musor';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin-musorok-modosit',
  templateUrl: './admin-musorok-modosit.component.html',
  styleUrls: ['./admin-musorok-modosit.component.css']
})
export class AdminMusorokModositComponent implements OnInit {

  musor: any = {};
  // define the constant url we would be uploading to.
  URL = 'http://localhost:3000/musoraink/picture';
  public uploader: FileUploader = new FileUploader({url: this.URL, itemAlias: 'photo'});
  constructor(
  private router: Router,
  private musorService: MusorService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.musorService.musor(this.route.snapshot.params.id).subscribe(response => {
      this.musor = response.musor;
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
  }

  modositMusor() {
    this.musorService.modosit(this.musor)
      .subscribe(response => {
        console.log(response);
        if (response.musor) {
          console.log('siker');
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

}
