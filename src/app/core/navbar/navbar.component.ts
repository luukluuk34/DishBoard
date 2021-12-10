import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/pages/entity/user/authentication.service'
import { User } from 'src/app/pages/entity/user/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    '.btn-link { color: rgba(255,255,255,.5); text-decoration: none; }',
    // tslint:disable-next-line: max-line-length
    '.btn-link.focus, .btn-link:focus, .btn-link.hover, .btn-link:hover { color: rgba(255,255,255,.75); text-decoration: none; box-shadow: none; }'
  ]
})
export class NavbarComponent {
  @Input() title: string = 'DishBoard';
  isNavbarCollapsed = true;
  currentUser:User | undefined;
  currentUser$!:Observable<User | undefined>

  constructor(private authenticationService:AuthenticationService, private route:Router) { 

  }

  ngOnInit(): void{
    this.currentUser$ = this.authenticationService.currentUser$;
    this.currentUser$.subscribe((user) => this.currentUser = user)
  }

  isLoggedIn(): Boolean {
    return this.authenticationService.isLoggedIn();
  }

  getUser(): User{
    if(this.authenticationService.currentUser != undefined){
      return this.authenticationService.currentUser;
    }else{
      return new User();
    }
  }

  navigateToUserDetail(){
    if(this.getUser()._id == undefined || this.getUser()._id == 0){
      this.route.navigate(['/register'])
      console.log("Please login")
    }else{
      console.log(this.getUser()._id);
      let link = this.getUser()._id;
      this.route.navigate([`/user-detail/${link}`]);
     
    }
  }

  logout():void{
    this.authenticationService.logout();
  }
}
