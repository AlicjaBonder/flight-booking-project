import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit{

  constructor(public ref: MatDialogRef<CurrencyConverterComponent>,
    @Inject(MAT_DIALOG_DATA)public data: any, private apidata: ApiDataService) { }
  ngOnInit(): void {
    this.returnValue=this.data.totalValue;
  }
    currencies:string[] = ['USD', 'EUR','PLN'];
    currency:string='';
    selectedCurrency = new FormControl('', Validators.required);
    returnValue:number=0;
    
    close(){
        this.currency=this.selectedCurrency.value;
        if(this.data.currencySymbol == 'PLN'){
          if(this.currency === 'USD'){
            this.convertToDolarsFromPLN();
          }else if(this.currency === 'EUR'){
            this.convertToEuroFromPLN();
          }
        }
        if(this.data.currencySymbol == 'USD'){
          if(this.currency === 'PLN'){
            this.convertToPLNFromUSD();
          }else if(this.currency === 'EUR'){
            this.convertToEuroFromUSD();
          }
        }
        if(this.data.currencySymbol == 'EUR'){
          if(this.currency === 'USD'){
            this.convertToUSDFromEUR();
          }else if(this.currency === 'PLN'){
            this.convertToPLNFromEUR();
          }
        }

    }

    convertToDolarsFromPLN(){
      this.apidata.getCurrenciesData().subscribe((data: any) => {
        let value = Number(this.data.totalValue/data[4].rates[1].mid );
        this.returnValue = value;
        this.ref.close({totalValue: this.returnValue, currency:'USD'});
      });
    }
    convertToEuroFromPLN(){
      this.apidata.getCurrenciesData().subscribe((data: any) => {
        let value = Number(this.data.totalValue/data[4].rates[7].mid );
        this.returnValue = value;
        this.ref.close({totalValue: this.returnValue, currency:'EUR'});
      });
    }
    convertToPLNFromUSD(){
      this.apidata.getCurrenciesData().subscribe((data: any) => {
        let value = Number(this.data.totalValue*data[4].rates[1].mid );
        this.returnValue = value;
        this.ref.close({totalValue: this.returnValue, currency:'PLN'});
      });
    }
    convertToEuroFromUSD(){
      this.apidata.getCurrenciesData().subscribe((data: any) => {
        let value = Number((this.data.totalValue*data[4].rates[1].mid)/data[4].rates[7].mid);
        this.returnValue = value;
        this.ref.close({totalValue: this.returnValue, currency:'EUR'});
      });
    }
    convertToUSDFromEUR(){
      this.apidata.getCurrenciesData().subscribe((data: any) => {
        let value = Number((this.data.totalValue*data[4].rates[7].mid)/data[4].rates[1].mid);
        this.returnValue = value;
        this.ref.close({totalValue: this.returnValue, currency:'USD'});
      });
    }
    convertToPLNFromEUR(){
      this.apidata.getCurrenciesData().subscribe((data: any) => {
        let value = Number(this.data.totalValue*data[4].rates[7].mid);
        this.returnValue = value;
        this.ref.close({totalValue: this.returnValue, currency:'PLN'});
      });
    }
}
