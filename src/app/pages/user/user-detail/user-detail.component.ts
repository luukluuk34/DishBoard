import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TempUsers,users } from 'src/tempData';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [
  ]
})
export class UserDetailComponent implements OnInit {
  //userId: string | null = null;
  user : TempUsers | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    //statisch
    //this.userId = this.route.snapshot.paramMap.get('id');
    //niet statisch

    this.route.paramMap.subscribe(params => { 
      //this.userId = params.get('id');
      this.user = users.find(u => u.id === Number(params.get('id')));
    });

    //var n : number = Number(this.userId);
    //this.name = this.nameArray[n -1]; 
  }

}
