import { compileNgModuleDeclarationExpression } from '@angular/compiler/src/render3/r3_module_compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { User, UserGender } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: [
  ]
})
export class UserEditComponent implements OnInit {
  user: User | undefined
  addUserForm = new FormGroup({
    firstName: new FormControl(' '),
    lastName : new FormControl(' '),
    email: new FormControl(' '),
    gender: new FormControl(' ')
  })
  public genders = Object.values(UserGender);

  constructor(private userService:UserService) { }

  onSubmit(): void {
    console.log('onSubmit', this.addUserForm.value);
    this.userService.addUser(this.addUserForm.value);
  }

  ngOnInit(): void {    
    // //gender: any[] = [
    //   {fullname: "male", shortname: "male"},
    //   {fullname: "female", shortname:'female'},
    //   {fullname: "x", shortname: "x"},
    //   {fullname: "unkown", shortname: }
    // ]
  }

}
