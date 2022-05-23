import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiDataService } from './services/api-data.service';
import { LoginDialogComponent } from './dialogs/login-dialog/login-dialog.component';
import 'hammerjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
 
  get currentUrl(){
    return window.location.href.includes('booking') || window.location.href.includes('final-page'); 
  }
  get loginInfo(){
    return sessionStorage.getItem('isLoggedIn');
  }
   constructor(private datePipe: DatePipe,private apidata: ApiDataService, public dialog: MatDialog, private router: Router) {}
  goToLogin(){
    const dialogRef = this.dialog.open(LoginDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  goToLogOut(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}