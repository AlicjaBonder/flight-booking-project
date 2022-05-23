import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/api-data.service';
import { Subscription, timer } from 'rxjs';
import { map, share } from "rxjs/operators";
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {

  public weather: any;
  constructor(private http: HttpClient,private apidata: ApiDataService) {        

}  

rxTime = new Date();
intervalId:any;
subscription: Subscription= new Subscription();
date: Date = new Date();
temp:string='';
weatherMain:string='';
weatherDesc:string='';

ngOnInit(): void {
  this.apidata.getWroclawWeatherData().subscribe(
    resp=>{console.log(resp)
      this.temp = Number(resp.main.temp-273.15).toFixed(2);
      this.weatherMain = resp.weather[0].main;
      this.weatherDesc = resp.weather[0].description;
  });

  this.subscription = timer(0, 1000)
  .pipe(
    map(() => new Date()),
    share()
  )
  .subscribe(time => {
    this.rxTime = time;
  });
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
