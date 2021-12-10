import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-recipe-interface',
  templateUrl: './recipe-interface.component.html',
  styleUrls: ['./recipe-interface.component.css']
})
export class RecipeInterfaceComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
  }
  isLoggedIn(){
    return this.auth.isLoggedIn();
  }
}
