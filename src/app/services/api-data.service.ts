import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private http:HttpClient) { }
  url_flights= 'https://alicjabonder.github.io/jsonsForProject.github.io/Data/loty_rzym.json';
  url_users= 'https://alicjabonder.github.io/jsonsForProject.github.io/Data/users.json';
  url_wroclaw_weather='https://api.openweathermap.org/data/2.5/weather?lat=51.1078852&lon=17.0385376&appid=753be2012deb7fd6184771d422e2e41d';
  url_currencies_euro='https://api.nbp.pl/api/exchangerates/tables/a/last/5/?format=json';
  url_warszawa_weather='https://api.openweathermap.org/data/2.5/weather?lat=52.237049&lon=21.017532&appid=753be2012deb7fd6184771d422e2e41d';
  url_mediolan_weather="https://api.openweathermap.org/data/2.5/weather?lat=45.464664&lon=9.188540&appid=753be2012deb7fd6184771d422e2e41d";
  url_rzym_weather="https://api.openweathermap.org/data/2.5/weather?lat=41.902782&lon=12.496366&appid=753be2012deb7fd6184771d422e2e41d";
  url_palermo_weather="https://api.openweathermap.org/data/2.5/weather?lat=38.116669&lon=13.366667&appid=753be2012deb7fd6184771d422e2e41d";
  getApiData(){
    return this.http.get(this.url_flights);
  }
  getUserData(){
    return this.http.get(this.url_users);
  }
  getWroclawWeatherData(): Observable<any>{
    return this.http.get(this.url_wroclaw_weather);
  }
  getWarszawaWeatherData(): Observable<any>{
    return this.http.get(this.url_warszawa_weather);
  }
  getMediolanWeatherData(): Observable<any>{
    return this.http.get(this.url_mediolan_weather);
  }
  getRzymWeatherData(): Observable<any>{
    return this.http.get(this.url_rzym_weather);
  }
  getPalermoWeatherData(): Observable<any>{
    return this.http.get(this.url_palermo_weather);
  }
  getCurrenciesData(){
    return this.http.get(this.url_currencies_euro);
  }
}
