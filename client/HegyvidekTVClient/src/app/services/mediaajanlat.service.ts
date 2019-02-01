import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class MediaajanlatService {
  constructor(private authHttp: AuthHttp, private http: Http) { }

  getMediaajanlat() {
    return this.http.get(environment.apiUrl + '/mediaajanlat')
      .map(response => response.json());
  }

  modosit(mediaajanlat) {
    return this.authHttp.put(environment.apiUrl + '/mediaajanlat', {szoveg: mediaajanlat})
      .map(response => response.json());
  }

}
