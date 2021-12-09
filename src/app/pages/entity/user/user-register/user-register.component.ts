import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
registerForm!:FormGroup
subs!: Subscription;
submitted = false;

  constructor(private authenticationService:AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,

      ]),
      password: new FormControl(null, [
        Validators.required,
      ]),
      firstName: new FormControl(null, [
        Validators.required,
      ]),
      lastName: new FormControl(null, [
        Validators.required,
      ]),
      about: new FormControl(null, [
        Validators.required,
      ]),
      dateOfBirth: new FormControl(null, [
        Validators.required,
      ]),
    });
    this.subs = this.authenticationService
    .getUserFromLocalStorage()
    .subscribe((user: User) => {
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
    if (this.registerForm.valid) {
      this.submitted = true;
      this.authenticationService
        .registerUser(this.registerForm.value)
        // .pipe(delay(1000))
        .subscribe((user) => {
          if (user) {
            console.log('Registered');
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
