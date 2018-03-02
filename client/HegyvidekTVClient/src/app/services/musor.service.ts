import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Musor } from '../interfaces/Musor';

@Injectable()
export class MusorService {

  constructor(private authHttp: AuthHttp, private http: Http) { }

  ujMusor(musor) {
    return this.http.post(environment.apiUrl + '/musoraink', musor)
      .map(response => response.json());
   }

}
