import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class IdojarasService {

  private apiUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?' +
  'q=Budapest,hu&lang=hu&units=metric&mode=json&appid=' + environment.weatherApiKey;
  constructor(private http: HttpClient) { }

  elorejelzes() {
    return this.http.get(this.apiUrl);
  }
}
