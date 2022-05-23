import { Injectable } from '@angular/core';
import { AdultPassengers } from '../model/adult-passengers';
import { FlightDetails } from '../model/flight-details';
import { InfantPassenger } from '../model/infant-passenger';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  flightDetails:FlightDetails | undefined;
  departure:string='';
  arrival:string='';
  totalPrice:number=0;
  currencySymbol:string='';
  passengersList:AdultPassengers[]=[];
  infantPassengersList:InfantPassenger[]=[];

  constructor() { }
  setData(AdultPassengersList:AdultPassengers[],infantsList:InfantPassenger[],details: FlightDetails, totalPrice:number, currencySymbol:string,
    departure:string,arrival:string){
      this.flightDetails=details;
      this.passengersList=AdultPassengersList;
      this.infantPassengersList=infantsList;
      this.departure=departure;
      this.arrival=arrival;
      this.totalPrice=totalPrice;
      this.currencySymbol=currencySymbol;
  }
}
