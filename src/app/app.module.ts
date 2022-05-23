import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
 import { MatNativeDateModule } from '@angular/material/core';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import {MatIconModule} from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { LoginDialogComponent } from './dialogs/login-dialog/login-dialog.component';
import {MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './navbar/navbar.component';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { WeatherComponent } from './components/weather/weather.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { MatRadioModule } from '@angular/material/radio';
import { AcceptDialogComponent } from './dialogs/accept-dialog/accept-dialog.component';
import { FinalPageComponent } from './components/final-page/final-page.component';
import { WarningDialogComponent } from './dialogs/warning-dialog/warning-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    SeatBookingComponent,
    LoginDialogComponent,
    NavbarComponent,
    WeatherComponent,
    CurrencyConverterComponent,
    AcceptDialogComponent,
    FinalPageComponent,
    WarningDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    HttpClientJsonpModule,
    MatRadioModule,
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
