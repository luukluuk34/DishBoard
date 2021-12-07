import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/pages/entity/user/authentication.service'
import { User } from 'src/app/pages/entity/user/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers:[AuthenticationService],
  styles: [
    '.btn-link { color: rgba(255,255,255,.5); text-decoration: none; }',
    // tslint:disable-next-line: max-line-length
    '.btn-link.focus, .btn-link:focus, .btn-link.hover, .btn-link:hover { color: rgba(255,255,255,.75); text-decoration: none; box-shadow: none; }'
  ]
})
export class NavbarComponent {
  @Input() title: string = '';
  isNavbarCollapsed = true;
  loggedInUser$!: Observable<User | undefined>;
  isUserLoggedIn!:boolean

  constructor(private authenticationService:AuthenticationService) { 
    
  }

  ngOnInit(): void{
    console.log("ngOnInit wordt aangeroepen");
    
    this.loggedInUser$ = this.authenticationService.currentUser$;
    this.loggedInUser$.subscribe();
  }

  isLoggedIn(): Boolean {
		if(this.authenticationService.currentUser$.value){
      return true;
    }else {
      return false;
    }
	}


  logout():void{
    this.authenticationService.logout();
  }
}
