import { Component, OnInit } from '@angular/core';
import { WeatherSettings, TemperatureScale, ForecastMode, WeatherLayout } from 'angular-weather-widget';

@Component({
  selector: 'app-idojaras',
  templateUrl: './idojaras.component.html',
  styleUrls: ['./idojaras.component.css']
})
export class IdojarasComponent {
  settings: WeatherSettings = {
    location: {
      cityName: 'Budapest,hu'
    },
    backgroundColor: '#347c57',
    color: '#ffffff',
    width: '400px',
    height: 'auto',
    showWind: false,
    scale: TemperatureScale.CELCIUS,
    forecastMode: ForecastMode.GRID,
    showDetails: false,
    showForecast: true,
    layout: WeatherLayout.NARROW,
    language: 'hu'
  };

}
