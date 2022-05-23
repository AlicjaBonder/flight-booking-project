import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent implements OnInit {

  constructor(public ref: MatDialogRef<WarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA)public data: any) { }
    displayText:string='';
  ngOnInit(): void {
    this.displayText=this.data.text;
  }

}
