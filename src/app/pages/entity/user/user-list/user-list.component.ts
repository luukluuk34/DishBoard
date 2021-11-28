import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  providers:[UserService],
  styles: [
  ]
})
export class UserListComponent implements OnInit {

  userList: User[] = [];
  constructor(private route :ActivatedRoute, private userService: UserService, ) { 
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
