import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [
  ]
})
export class UserDetailComponent implements OnInit {
  user : User;
  _id : string | null;
  loggedInUser!:User;
  userList: User[] = [];

  constructor(private route: ActivatedRoute, private userService : UserService, private auth:AuthenticationService) { 
    this.user = new User();
    this._id = "";
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this._id = params.get("id") ;
      console.log("test", this.userService.getById(this._id).subscribe((result) => {this.user = result, console.log("this is the result",result)}));
    });
    this.auth.getUserFromLocalStorage().subscribe((user) => {this.loggedInUser = user, console.log("LoggedInUser",user)});

    var check = () => {
      console.log(this.user._id)
      if(this.user._id != undefined){
        console.log("GetList", this.userService.getFollowing(this.user._id).subscribe((results) => this.userList = results));
      }else{
        console.log("In de recursieve functie")
        setTimeout(check, 10);
      }
    }
    check()
  }

  ngOnDestroy(){
  }

  followPerson(){
    this.userService.follow(this.user._id,this.loggedInUser._id).subscribe();
  }

}
