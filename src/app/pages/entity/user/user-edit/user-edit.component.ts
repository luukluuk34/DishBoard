import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User, UserRole } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  providers:[UserService],
  styles: [
  ]
})
export class UserEditComponent implements OnInit {
  user: User;
  addUserForm!:FormGroup;
  id:string| null | undefined;

  constructor(private userService:UserService, private router: Router, private route:ActivatedRoute) { 
    this.user = new User();
  }

  onSubmit(): void {
    console.log('onSubmit', this.addUserForm.value);
    if(this.addUserForm.invalid){
      return;
    }
    if(this.user?._id){
      console.log('updating user', this.user._id);
      this.user.firstName = this.addUserForm.get('firstName')?.value;
      this.user.lastName = this.addUserForm.get('lastName')?.value;
      this.user.email = this.addUserForm.get('email')?.value;
      this.user.about = this.addUserForm.get('about')?.value;
      this.user.dateOfBirth = this.addUserForm.get('dateOfBirth')?.value;
    }else{
      console.log('Adding user', this.addUserForm.value);
      this.userService.create(this.addUserForm.value).subscribe();
    }
    this.router.navigate(['/user-list']);
  }

  ngOnInit(): void {    
    this.route.params.subscribe(paramId => {
      this.id = paramId['id'] ?? '0';
    });
    if(this.id === '0'){
      console.log("add")
    }else{
      console.log("update", this.userService.getById(this.id).subscribe((result) => this.user = result));
     }

    this.addUserForm = new FormGroup({
      firstName: new FormControl(this.user?.firstName, Validators.required),
      lastName : new FormControl(this.user?.lastName,Validators.required),
      email: new FormControl(this.user?.email, Validators.required),
      about: new FormControl(this.user?.about),
      dateOfBirth: new FormControl(this.user?.dateOfBirth, Validators.required)
    })
    console.log(this.addUserForm);
  }

}
