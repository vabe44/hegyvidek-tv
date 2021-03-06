import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Epizod } from '../interfaces/Epizod';

@Injectable()
export class EpizodService {


  constructor(private authHttp: AuthHttp, private http: Http) { }

  osszes() {
    return this.http.get(environment.apiUrl + '/epizodok')
      .map(response => response.json());
  }

  epizod(id) {
    return this.http.get(environment.apiUrl + '/epizodok/' + id)
      .map(response => response.json());
  }

  kereses(szoveg) {
    return this.http.get(environment.apiUrl + '/epizodok/kereses?szoveg=' + szoveg)
      .map(response => response.json());
  }

  uj(epizod) {
    return this.authHttp.post(environment.apiUrl + '/epizodok', epizod)
      .map(response => response.json());
  }

  modosit(epizod) {
    return this.authHttp.put(environment.apiUrl + '/epizodok', epizod)
      .map(response => response.json());
  }

  torles(id) {
    return this.authHttp.delete(environment.apiUrl + '/epizodok/' + id)
      .map(response => response.json());
  }

  youtube(epizod) {
    return this.authHttp.post(environment.apiUrl + '/youtube/upload', epizod)
      .map(response => response.json());
  }

  isUrlUnique(url) {
    return this.http.post(environment.apiUrl + '/epizodok/urlcheck', {url: url})
      .map(response => response.json());
  }

}
