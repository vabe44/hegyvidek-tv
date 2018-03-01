import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/User';

@Injectable()
export class AuthService {
  currentUser: any;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      const jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(token);
    }
  }

  login(credentials) {
   return this.http.post<User>(environment.apiUrl + '/login', credentials)
    .map(response => {
      if (response && response['token']) {
        localStorage.setItem('token', response['token']);

        const jwt = new JwtHelper();
        this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
        return true;
      }
      return false;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn() {
    return tokenNotExpired('token');
  }

  register(credentials) {
    return this.http.post<User>(environment.apiUrl + '/register', credentials)
     .map(response => {
        if (response && response['token']) {
          localStorage.setItem('token', response['token']);

         const jwt = new JwtHelper();
         this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
         return true;
       }
       return false;
     });
   }
}
