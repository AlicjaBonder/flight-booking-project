import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyConverterComponent } from '../components/currency-converter/currency-converter.component';
import { AcceptDialogComponent } from '../dialogs/accept-dialog/accept-dialog.component';
import { AdultPassengers } from '../model/adult-passengers';
import { FlightDetails } from '../model/flight-details';
import { InfantPassenger } from '../model/infant-passenger';
import { SummaryService } from '../services/summary.service';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.scss'],
})
export class SeatBookingComponent implements OnInit {
  flight: any;
  departure: any;
  arrival: any;
  arrivalTime: any;
  price:any;
  adultPassengers: any;
  childPassengers: any;
  infantPassengers:any;
  time: any;
  selectedRow = new FormControl('', Validators.required);
  selectedColumn = new FormControl('', Validators.required);
  labelPosition: 'Adult' | 'Child' = 'Adult';

  rows: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13','14','15','16','17','18','19','20'];
  columns: string[] = ['A', 'B', 'C','D'];
  
  rowSeat: string = '';
  columnSeat: string = '';
  
  showForm: boolean = false;
  showDataFromForm: boolean = false;
  form: FormGroup;
  formInfant: FormGroup;
  name: string = '';
  surname: string = '';
  baggageValue:number=1;
  showBaggageInfo:boolean=false;
  noBaggageInfo:boolean=false;
  baggageCost:number=0;
  showSeats:boolean=false;
  totalPrice:number=0;
  currencySymbol:string='PLN';
  AdultPassengersList:AdultPassengers[]=[];
  InfantsList:InfantPassenger[]=[]
  summaryButtonShow:boolean=false;

  constructor(private formBuilder: FormBuilder,public dialog: MatDialog, private summaryService: SummaryService) {
    // @ts-ignore
    this.form = FormGroup;
    // @ts-ignore
    this.formInfant=FormGroup;

  }
  ngOnInit(): void {
    this.flight = sessionStorage.getItem('flight');
    this.time = sessionStorage.getItem('time');
    this.price = sessionStorage.getItem('price');
    this.arrivalTime=sessionStorage.getItem('arrivalTime');
    this.departure = sessionStorage.getItem('departure');
    this.arrival = sessionStorage.getItem('arrival');
    this.adultPassengers= Number(sessionStorage.getItem('adultQuantity'));
    this.childPassengers= Number(sessionStorage.getItem('childQuantity'));
    this.infantPassengers= sessionStorage.getItem('infantQuantity');

    this.totalPrice = this.price*this.adultPassengers+this.price*this.childPassengers;
    for (let c = 0; c <(this.adultPassengers + this.childPassengers); c++) {
      let passenger = new AdultPassengers();
        passenger.id = c+1;
      this.AdultPassengersList.push(passenger);
    }
    for (let c = 0; c <this.infantPassengers; c++) {
      let infant = new InfantPassenger();
      infant.id = c+1;
      this.InfantsList.push(infant);
    }
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
    });
    this.formInfant = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
    });
    window.scroll(0,0);
  }
  checkInBaggage(item:AdultPassengers) {
    let foundIndex = this.AdultPassengersList.findIndex(x => x.id == item.id);
    this.AdultPassengersList[foundIndex].checkInBag = this.baggageValue;
    this.AdultPassengersList[foundIndex].freeBag = false;
    this.AdultPassengersList[foundIndex].showBaggageInfo = true;
    this.AdultPassengersList[foundIndex].noBaggageInfo = false;
    this.totalPrice+=100*this.baggageValue;
  }
  noBaggage(item:AdultPassengers){
    let foundIndex = this.AdultPassengersList.findIndex(x => x.id == item.id);
    this.AdultPassengersList[foundIndex].freeBag = true;
    this.AdultPassengersList[foundIndex].checkInBag = 0;
    this.AdultPassengersList[foundIndex].showBaggageInfo = false;
    this.AdultPassengersList[foundIndex].noBaggageInfo = true;
  }
  chooseSeats(item:AdultPassengers) {
    if( this.selectedRow.value && this.selectedColumn.value){
      this.rowSeat = this.selectedRow.value;
      this.columnSeat = this.selectedColumn.value;
      let checkAvailable=this.AdultPassengersList.find(x=>x.seatRow== this.rowSeat &&x.seatColumn == this.columnSeat);
      
      if (checkAvailable === undefined) {
      let foundIndex = this.AdultPassengersList.findIndex(x => x.id == item.id);
      this.AdultPassengersList[foundIndex].seatColumn = this.columnSeat;
      this.AdultPassengersList[foundIndex].seatRow =  this.rowSeat;
      this.AdultPassengersList[foundIndex].showChoosenSeat =  true;
      this.showForm = true;
      this.showSeats = true;
      if(this.AdultPassengersList.find(x=>x.seatRow=="" && x.seatColumn == "") === undefined){
          this.summaryButtonShow=true;
          let el = document.getElementById("summary-wrapper");
          if(el){
            el.scrollIntoView({behavior: 'smooth'});
          } 
      }
      }else{
        this.selectedColumn.setErrors({ 'notAvailable': true });
      }
    }else{
      this.selectedRow.markAsTouched();
      this.selectedColumn.markAsTouched();
    }
  }
  onSubmit(item:AdultPassengers) {
    if (this.form.valid) {
      try {
        // @ts-ignore
        this.name = this.form.get('name').value;
        // @ts-ignore
        this.surname = this.form.get('surname').value;
        let passenger = new AdultPassengers();
        passenger.id=item.id;
        passenger.name= this.name;
        passenger.surname= this.surname;
        passenger.adult=this.labelPosition;
        passenger.showDataFromForm= true;
        var foundIndex = this.AdultPassengersList.findIndex(x => x.id == item.id);
        this.AdultPassengersList[foundIndex] = passenger;
        this.showDataFromForm = true;
        
      } catch (err) {}
    }
  }
  onSubmitInfant(item:InfantPassenger){
    if (this.formInfant.valid) {
      try {
        // @ts-ignore
        this.name = this.formInfant.get('name').value;
        // @ts-ignore
        this.surname = this.formInfant.get('surname').value;
        let passenger = new InfantPassenger();
        passenger.id=item.id;
        passenger.name= this.name;
        passenger.surname= this.surname;
        passenger.infant=true;
        passenger.showDataFromForm= true;
        const foundIndex = this.InfantsList.findIndex((x) => x.id == item.id);
        this.InfantsList[foundIndex] = passenger;
        this.showDataFromForm = true;
      } catch (err) {}
    }
  }
  minusOne(){
    if(this.baggageValue > 1){
      this.baggageValue--;
    }
  }
  addOne(){
    if(this.baggageValue < 3){
      this.baggageValue++;
    }
  }
  getAccept() {
    let flightDetails = new FlightDetails();
    flightDetails.date=this.flight;
    flightDetails.time=this.time;
    flightDetails.arriveTime=this.arrivalTime;
    this.summaryService.setData(this.AdultPassengersList,this.InfantsList,flightDetails,this.totalPrice,this.currencySymbol,
      this.departure,this.arrival);
    const dialogRef = this.dialog.open(AcceptDialogComponent,{
      disableClose: false,
      });
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
