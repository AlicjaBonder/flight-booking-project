import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accept-dialog',
  templateUrl: './accept-dialog.component.html',
  styleUrls: ['./accept-dialog.component.scss']
})
export class AcceptDialogComponent {

  constructor(private router: Router, private ref: MatDialogRef<AcceptDialogComponent>) { }

  accept(){
    this.router.navigate(['/final-page']).then(() => {
      this.ref.close();
    });
  }
}
