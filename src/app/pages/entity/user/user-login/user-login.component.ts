import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  providers:[AuthenticationService],
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  subs!: Subscription;
  submitted = false;
  
  constructor(private authenticationService:AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
      ]),
    });
    this.subs = this.authenticationService
    .getUserFromLocalStorage()
    .subscribe((user: User) => {
      console.log(user);
      if (user) {
        console.log('User already logged in > to dashboard');
        this.router.navigate(['/']);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitted = true;
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authenticationService
        .login(email, password)
        // .pipe(delay(1000))
        .subscribe((user) => {
          if (user) {
            console.log('Logged in');
            this.router.navigate(['/']);
          }
          this.submitted = false;
        });
    } else {
      this.submitted = false;
      console.error('loginForm invalid');
    }
  }

}

