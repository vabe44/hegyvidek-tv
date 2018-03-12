import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class HirService {

  constructor(private authHttp: AuthHttp, private http: Http) { }

  osszes() {
    return this.http.get(environment.apiUrl + '/hirek')
      .map(response => response.json());
  }

  hir(id) {
    return this.http.get(environment.apiUrl + '/hirek/' + id)
      .map(response => response.json());
  }

  uj(hir) {
    return this.http.post(environment.apiUrl + '/hirek', hir)
      .map(response => response.json());
  }

  modosit(hir) {
    return this.http.put(environment.apiUrl + '/hirek', hir)
      .map(response => response.json());
  }

  torles(id) {
    return this.http.delete(environment.apiUrl + '/hirek/' + id)
      .map(response => response.json());
  }

}
