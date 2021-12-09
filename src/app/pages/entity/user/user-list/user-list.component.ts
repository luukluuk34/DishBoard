import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [
  ]
})
export class UserListComponent implements OnInit {
  currentUser:User | undefined;
  userList: User[] = [];
  constructor(private route :ActivatedRoute, private userService: UserService, private authenticationService:AuthenticationService) { 
    this.currentUser = this.authenticationService.currentUser;
  }

  ngOnInit(): void {
    console.log("GetList", this.userService.getList().subscribe((results) => this.userList = results));
  }
  deleteUser(_id:any){
    console.log("_id", _id)
    console.log("Delete User", this.userService.delete(_id).subscribe()); 
    this.userList = this.userList.filter(user => user._id !== _id);
  }
}
