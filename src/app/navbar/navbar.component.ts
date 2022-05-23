import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiDataService } from '../services/api-data.service';
import { LoginDialogComponent } from '../dialogs/login-dialog/login-dialog.component';
import { FlightDetails } from '../model/flight-details';
import { WarningDialogComponent } from '../dialogs/warning-dialog/warning-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  selectedDeparture = new FormControl('', Validators.required);
  selectedArrival = new FormControl('', Validators.required);
  dateOfFlight = new FormControl('', Validators.required);
  dateOfFlight2 = new FormControl('', Validators.required);
  todayDate:Date = new Date();
  adultQuantity: number = 1;
  childQuantity: number = 0;
  infantQuantity: number = 0;
  choosenPassangers: any = 'Passengers';
  paginatorQunatity:number=10;

  cities: string[] = ['Rzym', 'Mediolan', 'Palermo'];
  departures: string[] = ['Wrocław', 'Warszawa'];
  
  constructor(
    private datePipe: DatePipe,
    private apidata: ApiDataService,
    public dialog: MatDialog, 
    private router: Router
  ) {}
  ngOnInit(): void {
  }
  title = 'flights-reservation';
  showCustomerFlights = false;
  showResults: FlightDetails[] = [];
  flights5Show: FlightDetails[] = [];
  connections: any[] = [];
  departure: string = '';
  arrival: string = '';
  hideButton:boolean=false;
  ckeckFlights() {
    if (
      this.selectedDeparture.value &&
      this.selectedArrival.value &&
      this.dateOfFlight.value && this.dateOfFlight2.value
      &&(this.dateOfFlight.value <= this.dateOfFlight2.value)
    ) {
      let startDate = new Date(this.dateOfFlight.value);
      let endDate = this.adjustDateForTimeOffset(this.dateOfFlight2.value);
      this.showCustomerFlights = true;
      this.apidata.getApiData().subscribe((data: any) => {
        this.showResults = data;

        this.showResults = this.showResults.filter((item) => {
          let date = new Date(item.date);
          return date >= startDate && date <= endDate;
        });

        this.departure = this.selectedDeparture.value;
        this.arrival = this.selectedArrival.value;
        if(this.choosenPassangers === 'Passengers'){
          this.choosenPassangers = '1 Adult';
        }
      });
    } else {
      this.selectedArrival.markAsTouched();
      this.selectedDeparture.markAsTouched();
      this.dateOfFlight.markAsTouched();
      this.dateOfFlight2.markAsTouched();
    }
  }
 adjustDateForTimeOffset(dateToAdjust:Date) {
    var offsetMs = dateToAdjust.getTimezoneOffset() * 60000;
    return new Date(dateToAdjust.getTime() - offsetMs);
    }
  goToLogin(chooseFlight: FlightDetails) {
    sessionStorage.setItem('flight', chooseFlight.date);
    sessionStorage.setItem('time', chooseFlight.time);
    sessionStorage.setItem('price', chooseFlight.price);
    sessionStorage.setItem('arrivalTime', chooseFlight.arriveTime);
    sessionStorage.setItem('departure', this.selectedDeparture.value);
    sessionStorage.setItem('arrival', this.selectedArrival.value);
    sessionStorage.setItem('adultQuantity', JSON. stringify(this.adultQuantity));
    sessionStorage.setItem('childQuantity', JSON. stringify(this.childQuantity));
    sessionStorage.setItem('infantQuantity', JSON. stringify(this.infantQuantity));

    if (sessionStorage.getItem('isLoggedIn')){
      this.router.navigate(['/booking'])
    }else{
      const dialogRef = this.dialog.open(LoginDialogComponent);

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
  getRandomPrice(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  showNext10(){
    let x=+10;
    this.flights5Show = this.showResults.slice(0, x);
    if(this.flights5Show.length >= this.showResults.length){
      this.hideButton=true;
    }
    this.paginatorQunatity=this.showResults.length-this.flights5Show.length;
  }
  minusOneAdult(){
    if(this.adultQuantity >1){
      this.adultQuantity--;
    }
    
  }
  addOneAdult(){
    if(this.adultQuantity < 10){
      this.adultQuantity++;
    }else{
      const dialogRef = this.dialog.open(WarningDialogComponent,{
        disableClose: false,
        data: {
          text: 'the number of adults must not exceed 10 !!'
        }
        });
    }
    
  }
  minusOneChild(){
    if(this.childQuantity >0){
      this.childQuantity--;
    }
  }
  addOneChild(){
    if(this.childQuantity < 10){
      this.childQuantity++;
    }
  }
  minusOneInfant(){
    if( this.infantQuantity>0){
      this.infantQuantity--;
    }
    
  }
  addOneInfant(){
    if(this.adultQuantity>this.infantQuantity){
      this.infantQuantity++;
    }else{
      const dialogRef = this.dialog.open(WarningDialogComponent,{
        disableClose: false,
        data: {
          text: 'The number of infants must not exceed that of adults !!'
        }
        });
    }
  }
  choosenPassengers(){
    if(this.adultQuantity>0){
      this.choosenPassangers = this.adultQuantity + ' Adult';
      if(this.childQuantity>0){
        this.choosenPassangers = this.choosenPassangers + ', ' + this.childQuantity + ' Child';
      }
      if(this.infantQuantity>0){
        this.choosenPassangers = this.choosenPassangers + ', ' + this.infantQuantity + ' Infant';
      }
    }
  }
  comparisonEnddateValidator(){
    if(this.dateOfFlight.value > this.dateOfFlight2.value){
      this.dateOfFlight2.setErrors({ 'invaliddaterange': true });
    }
  }

}
