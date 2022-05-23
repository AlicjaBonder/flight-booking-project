import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalPageComponent } from './components/final-page/final-page.component';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';

const routes: Routes = [
  { path: 'booking', component: SeatBookingComponent },{ path: 'final-page', component: FinalPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
