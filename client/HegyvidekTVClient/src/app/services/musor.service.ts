import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Musor } from '../interfaces/Musor';

@Injectable()
export class MusorService {

  constructor(private authHttp: AuthHttp, private http: Http) { }

  osszes() {
    return this.http.get(environment.apiUrl + '/musoraink')
      .map(response => response.json());
  }

  musor(id) {
    return this.http.get(environment.apiUrl + '/musoraink/' + id)
      .map(response => response.json());
  }

  uj(musor) {
    return this.http.post(environment.apiUrl + '/musoraink', musor)
      .map(response => response.json());
  }

  modosit(musor) {
    return this.http.put(environment.apiUrl + '/musoraink', musor)
      .map(response => response.json());
  }

  torles(id) {
    return this.http.delete(environment.apiUrl + '/musoraink/' + id)
      .map(response => response.json());
  }

  isUrlUnique(url) {
    return this.http.post(environment.apiUrl + '/musoraink/urlcheck', url)
      .map(response => response.json());
  }
}
