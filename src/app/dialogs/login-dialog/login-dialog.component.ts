import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  isLoggedIn = false;
  isMainPageLogIn:boolean=false;

  constructor(
    private ref: MatDialogRef<LoginDialogComponent>,
    private apidata: ApiDataService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
  }
  onSubmit() {
    if (this.form.valid) {
      try {
        // @ts-ignore
        const email = this.form.get('email').value;
        // @ts-ignore
        const password = this.form.get('password').value;

        this.apidata.getUserData().subscribe((data: any) => {
          data.filter((item: { email: string; password: string }) => {
            if (item.email === email && item.password === password) {
                this.isLoggedIn = true;
                sessionStorage.setItem('isLoggedIn', 'true');
                if(sessionStorage.getItem('flight') !== null){
                  this.router.navigate(['/booking']).then(() => {
                    this.ref.close();
                    window.location.reload();
                  });
                }else{
                  this.isMainPageLogIn=true;
                }

            } else {
              this.form.setErrors({
                credentials: { message: 'Wrong credentials' },
              });
            }
          });
        });
      } catch (err) {}
    }
  }
}
