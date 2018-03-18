import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class KapcsolatService {

  constructor(private authHttp: AuthHttp, private http: Http) { }

  beallitasok() {
    return this.http.get(environment.apiUrl + '/contact/gmail')
      .map(response => response.json());
  }

  kuldes(uzenet) {
    return this.http.post(environment.apiUrl + '/contact', uzenet)
      .map(response => response.json());
  }

  frissites(beallitasok) {
    return this.http.put(environment.apiUrl + '/contact/gmail', beallitasok)
      .map(response => response.json());
  }

  torles() {
    return this.http.delete(environment.apiUrl + '/contact/gmail')
      .map(response => response.json());
  }
}
