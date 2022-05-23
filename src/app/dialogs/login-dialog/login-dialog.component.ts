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
  form: FormGroup;
  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  isLoggedIn = false;
  constructor(
    private ref: MatDialogRef<LoginDialogComponent>,
    private apidata: ApiDataService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // @ts-ignore
    this.form = FormGroup;
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
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
            if (item.email === email) {
              if (item.password === password) {
                this.isLoggedIn = true;
                console.log(this.isLoggedIn);
                sessionStorage.setItem('isLoggedIn', 'true');
                this.router.navigate(['/booking']).then(() => {
                  this.ref.close();
                  window.location.reload();
                });
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
