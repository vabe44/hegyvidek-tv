import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class MusorujsagService {

  constructor(private authHttp: AuthHttp, private http: Http) { }

  osszes() {
    return this.http.get(environment.apiUrl + '/musorujsag')
      .map(response => response.json());
  }

  musorujsag(id) {
    return this.http.get(environment.apiUrl + '/musorujsag/' + id)
      .map(response => response.json());
  }

  musor(musorId) {
    return this.http.get(environment.apiUrl + '/musorujsag/musor/' + musorId)
      .map(response => response.json());
  }

  uj(musorujsag) {
    return this.authHttp.post(environment.apiUrl + '/musorujsag', musorujsag)
      .map(response => response.json());
  }

  modosit(musorujsag) {
    return this.authHttp.put(environment.apiUrl + '/musorujsag', musorujsag)
      .map(response => response.json());
  }

  torles(id) {
    return this.authHttp.delete(environment.apiUrl + '/musorujsag/' + id)
      .map(response => response.json());
  }

}
