import { Injectable } from "@angular/core";
import { EmailValidator } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { User, UserGender, UserRole } from "./user.model";

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
      gender: UserGender.male,
      role : UserRole.admin
    },
    {
      id: 2,
      firstName: "Marit",
      lastName: "Bartels",
      email: "Marit-bartels@hotmail.com",
      gender: UserGender.female,
      role: UserRole.editor
    },
    {
      id: 3,
      firstName: "Laura",
      lastName: "Bartels",
      email: "Laura-bartels@hotmail.com",
      gender: UserGender.female,
      role: UserRole.editor
    },
    {
      id: 4 ,
      firstName: "Wessel",
      lastName: "Kuijstermans",
      email: "Wessel-Kuijstermans@hotmail.com",
      gender: UserGender.x,
      role: UserRole.guest
    },
    {
      id: 5 ,
      firstName: "Mart",
      lastName: "Van Holten",
      email: "Mart-holten@hotmail.com",
      gender: UserGender.male,
      role: UserRole.guest
    }
    ];
    userSelected = new BehaviorSubject<User>(new User(0,"","","",UserGender.ratherNotSay));

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
      addUser(user:User){
        console.log("AddUser", user);
        const tempUser = this.users[this.users.length - 1];
        const tempId:number = tempUser?.id ?? 0;
        user.id = tempId + 1;
        console.log("New User Id", user.id);
        this.users.push(user);
      }
      updateUser(user:User){
        console.log("UpdateUser",user.id);
        this.users[user.id - 1] = user;
      }
      deleteUser(id:number){
        console.log("Deleting User");
        this.users.forEach((element,index)=> {
          if(element.id==id) this.users.splice(index,1);
        });
        
      }
    
}