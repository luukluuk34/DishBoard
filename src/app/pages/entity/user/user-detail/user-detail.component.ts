import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  providers:[UserService],
  styles: [
  ]
})
export class UserDetailComponent implements OnInit {
  user : User;
  _id : string | null;

  constructor(private route: ActivatedRoute, private userService : UserService) { 
    this.user = new User();
    this._id = "";
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this._id = params.get("id") ;
      console.log("test", this.userService.getById(this._id).subscribe((result) => this.user = result));
    });
  }

}
