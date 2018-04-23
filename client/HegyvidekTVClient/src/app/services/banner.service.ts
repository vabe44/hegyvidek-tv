import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Banner } from '../interfaces/Banner';

@Injectable()
export class BannerService {

  constructor(private authHttp: AuthHttp, private http: Http) { }

  osszes() {
    return this.http.get(environment.apiUrl + '/bannerek')
      .map(response => response.json());
  }

  banner(id) {
    return this.http.get(environment.apiUrl + '/bannerek/' + id)
      .map(response => response.json());
  }

  ervenyesBannerek() {
    return this.http.get(environment.apiUrl + '/bannerek/ervenyes')
      .map(response => response.json());
  }

  uj(banner) {
    return this.authHttp.post(environment.apiUrl + '/bannerek', banner)
      .map(response => response.json());
  }

  modosit(banner) {
    return this.authHttp.put(environment.apiUrl + '/bannerek', banner)
      .map(response => response.json());
  }

  torles(id) {
    return this.authHttp.delete(environment.apiUrl + '/bannerek/' + id)
      .map(response => response.json());
  }

  aktivBannerek(bannerek: Banner[]): Banner[] {
    return bannerek.filter(banner => banner.statusz === 'aktív');
  }

  inaktivBannerek(bannerek: Banner[]): Banner[] {
    return bannerek.filter(banner => banner.statusz === 'inaktív');
  }
}
