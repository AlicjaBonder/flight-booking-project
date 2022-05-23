import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdultPassengers } from 'src/app/model/adult-passengers';
import { FlightDetails } from 'src/app/model/flight-details';
import { InfantPassenger } from 'src/app/model/infant-passenger';
import { ApiDataService } from 'src/app/services/api-data.service';
import { SummaryService } from 'src/app/services/summary.service';
import { CurrencyConverterComponent } from '../currency-converter/currency-converter.component';

@Component({
  selector: 'app-final-page',
  templateUrl: './final-page.component.html',
  styleUrls: ['./final-page.component.scss']
})
export class FinalPageComponent implements OnInit {

  constructor( private summaryService: SummaryService,public dialog: MatDialog, private apidata: ApiDataService,private router: Router) { }
  flightDetails:FlightDetails | undefined;
  departure:string='';
  arrival:string='';
  totalPrice:number=0;
  currencySymbol:string='';
  passengersList:AdultPassengers[]=[];
  infantPassengersList:InfantPassenger[]=[];
  temp:string='';
  weatherMain:string='';
  weatherDesc:string='';

  ngOnInit(): void {
    this.flightDetails = this.summaryService.flightDetails;
    this.departure = this.summaryService.departure;
    this.arrival = this.summaryService.arrival;
    this.totalPrice = this.summaryService.totalPrice;
    this.currencySymbol = this.summaryService.currencySymbol;
    this.passengersList = this.summaryService.passengersList;
    this.infantPassengersList = this.summaryService.infantPassengersList;

    if(this.arrival === 'Mediolan'){
      this.apidata.getMediolanWeatherData().subscribe(
        resp=>{
          this.temp = Number(resp.main.temp-273.15).toFixed(2);
          this.weatherMain = resp.weather[0].main;
          this.weatherDesc = resp.weather[0].description;
      });
    }
        if(this.arrival === 'Rzym'){
      this.apidata.getRzymWeatherData().subscribe(
        resp=>{
          this.temp = Number(resp.main.temp-273.15).toFixed(2);
          this.weatherMain = resp.weather[0].main;
          this.weatherDesc = resp.weather[0].description;
      });
    }
        if(this.arrival === 'Palermo'){
      this.apidata.getPalermoWeatherData().subscribe(
        resp=>{
          this.temp = Number(resp.main.temp-273.15).toFixed(2);
          this.weatherMain = resp.weather[0].main;
          this.weatherDesc = resp.weather[0].description;
      });
    }
  }
  get showWeather(){
    const actualDate=new Date();
    // @ts-ignore
    const departureDate=new Date(this.flightDetails.date);
    if((departureDate.getTime()-actualDate.getTime()) / (1000 * 3600 * 24) <= 5){
        return true;
    }else{
      return false;
    }
  }
  goToMainPage(){
    this.router.navigate(['/'])
  }
  changeCurrency() {
    const dialogRef = this.dialog.open(CurrencyConverterComponent,{
      disableClose: false,
      data: {
        totalValue: this.totalPrice,
        currencySymbol: this.currencySymbol
      }
      });
      dialogRef.afterClosed().subscribe((response:any)=> {
        this.totalPrice=response.totalValue;
        this.currencySymbol=response.currency;
      })
  }

}
