import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [
  ]
})
export class UserDetailComponent implements OnInit {
  //userId: string | null = null;
  user : User;

  constructor(private route: ActivatedRoute, private userService : UserService) { 
    this.user = new User();
  }

  ngOnInit(): void {
    //statisch
    //this.userId = this.route.snapshot.paramMap.get('id');
    //niet statisch
    this.route.paramMap.subscribe(params => { 
      this.user = this.userService.getUserById(Number(params.get("id")));
    });
  }

}
