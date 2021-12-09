import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/pages/entity/user/authentication.service';
import { User } from 'src/app/pages/entity/user/user.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentUser:User | undefined;
  currentUser$!:Observable<User | undefined>
  constructor(private authenticationService:AuthenticationService, private route:Router) { 

  }

  ngOnInit(): void {
    this.currentUser$ = this.authenticationService.currentUser$;
    this.currentUser$.subscribe((user) => this.currentUser = user)
  }

}
