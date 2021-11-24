import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../models/user.service';
import { User } from '../../../../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  providers:[UserService],
  styles: [
  ]
})
export class UserListComponent implements OnInit {

  //users$: Observable<User[]| null> | undefined;
  userList: User[] = [];
  constructor(private userService: UserService) { 
    console.log("test", this.userService.getList().subscribe((results) => this.userList = results));
    console.log("test",this.userList);
  }

  ngOnInit(): void {
    //this.users$ = this.userService.getList();
    
    
    //this.users$.subscribe((results: User[]) => this.userList = results);
    //console.log("user-list",this.users$);
  }
  deleteUser(id:number){
    //this.userService.deleteUser(id);
  }
}
