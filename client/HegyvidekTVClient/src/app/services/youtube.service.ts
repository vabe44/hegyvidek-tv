import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class YoutubeService {

  constructor(private authHttp: AuthHttp, private http: Http) { }

  beallitasok() {
    return this.http.get(environment.apiUrl + '/youtube/settings')
      .map(response => response.json());
  }

  frissites(beallitasok) {
    return this.http.put(environment.apiUrl + '/youtube/settings', beallitasok)
      .map(response => response.json());
  }

  torles() {
    return this.http.delete(environment.apiUrl + '/youtube/settings')
      .map(response => response.json());
  }
}
