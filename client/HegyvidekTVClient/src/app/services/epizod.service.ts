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

  uj(epizod) {
    return this.http.post(environment.apiUrl + '/epizodok', epizod)
      .map(response => response.json());
  }

  modosit(epizod) {
    return this.http.put(environment.apiUrl + '/epizodok', epizod)
      .map(response => response.json());
  }

  torles(id) {
    return this.http.delete(environment.apiUrl + '/epizodok/' + id)
      .map(response => response.json());
  }

  youtube(epizod) {
    return this.http.post(environment.apiUrl + '/youtube/upload', epizod)
      .map(response => response.json());
  }

}
