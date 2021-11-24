import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../../../models/user.service';
import { User } from '../../../../models/user.model';

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
