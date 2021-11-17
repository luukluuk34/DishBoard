import { Injectable } from "@angular/core";
import { User, UserRole } from "./user.model";

@Injectable({
    providedIn: "root",
})

export class UserService {
    readonly users: User[]= [
    {
      id: 1,
      firstName: "Luuk",
      lastName: "Bartels",
      email: "luuk-bartels@hotmail.com",
      role : UserRole.admin
    },
    {
      id: 2,
      firstName: "Marit",
      lastName: "Bartels",
      email: "Marit-bartels@hotmail.com",
      role: UserRole.editor
    },
    {
      id: 3,
      firstName: "Laura",
      lastName: "Bartels",
      email: "Laura-bartels@hotmail.com",
      role: UserRole.editor
    },
    {
      id: 4 ,
      firstName: "Wessel",
      lastName: "Kuijstermans",
      email: "Wessel-Kuijstermans@hotmail.com",
      role: UserRole.guest
    }
    ];
    constructor() {
        console.log('Service constructor aangeroepen');
      }
    
      getUsers(): User[] {
        console.log('getUsers aangeroepen');
        return this.users;
      }
    
      getUserById(id: number): User {
        console.log('getUserById aangeroepen');
        return this.users.filter((user) => user.id === id)[0];
      }
    
}