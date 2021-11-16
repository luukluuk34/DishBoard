import { Component, OnInit } from '@angular/core';
import { users } from 'src/tempData';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [
  ]
})
export class UserListComponent implements OnInit {

  constructor() { }
  users = users;

  ngOnInit(): void {
  }

}
