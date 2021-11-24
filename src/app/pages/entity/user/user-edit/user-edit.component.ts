import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User, UserRole } from '../../../../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: [
  ]
})
export class UserEditComponent implements OnInit {
  user: User;
  addUserForm!:FormGroup;
  id:String;

  constructor(private userService:UserService, private router: Router, private route:ActivatedRoute) { 
    this.user = new User(0,"","","");
    this.id="0";
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
      this.userService.updateUser(this.user);
    }else{
      console.log('Adding user', this.addUserForm.value);
      this.userService.addUser(this.addUserForm.value);
    }
    this.router.navigate(['/']);
  }

  ngOnInit(): void {    
    this.addUserForm = new FormGroup({
      firstName: new FormControl(this.user?.firstName, Validators.required),
      lastName : new FormControl(this.user?.lastName,Validators.required),
      email: new FormControl(this.user?.email, Validators.required),
    })

    this.route.params.subscribe(paramId => {
      this.id = paramId['id'] ?? '0';
    });

    if(this.id === '0'){
      console.log("add")
      //this.user = new User(0,"","","");
    }else{
      this.userService.userSelected.subscribe(res => {
        console.log("CurrentID", this.id);
        console.log("Updated", res);
        this.user = res;
       // this.user._id = Number(this.id);
        console.log("User", this.user)
      });
    }
  }

}
