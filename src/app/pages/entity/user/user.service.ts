import { Injectable } from "@angular/core";
import { EmailValidator } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { User, UserRole } from "../../../models/user.model";

@Injectable({
    providedIn: "root",
})

export class UserService {
    readonly users: User[]= [
    {
      _id: 1,
      firstName: "Luuk",
      lastName: "Bartels",
      email: "luuk-bartels@hotmail.com",
      about: "",
      dateOfBirth: new Date("16-02-1997"),
    },
    {
      _id: 2,
      firstName: "Marit",
      lastName: "Bartels",
      email: "Marit-bartels@hotmail.com",
      dateOfBirth: new Date("16-02-1997"),
      about:"",
    },
    {
      _id: 3,
      firstName: "Laura",
      lastName: "Bartels",
      email: "Laura-bartels@hotmail.com",
      dateOfBirth: new Date("16-02-1997"),
      about:"",
    },
    {
      _id: 4 ,
      firstName: "Wessel",
      lastName: "Kuijstermans",
      email: "Wessel-Kuijstermans@hotmail.com",
      dateOfBirth: new Date("16-02-1997"),
      about:"",
    },
    {
      _id: 5 ,
      firstName: "Mart",
      lastName: "Van Holten",
      email: "Mart-holten@hotmail.com",
      dateOfBirth: new Date("16-02-1997"),
      about:"",
    }
    ];
    userSelected = new BehaviorSubject<User>(new User(0,"","",""));

    constructor() {
        console.log('Service constructor aangeroepen');
      }
    
      getUsers(): User[] {
        console.log('getUsers aangeroepen');
        return this.users;
      }
    
      getUserById(id: number): User {
        console.log('getUserById aangeroepen');
        return this.users.filter((user) => user._id === id)[0];
      }
      addUser(user:User){
        console.log("AddUser", user);
        const tempUser = this.users[this.users.length - 1];
        //const tempId:number = tempUser?._id ?? 0;
        //user._id = tempId + 1;
        console.log("New User Id", user._id);
        this.users.push(user);
      }
      updateUser(user:User){
        console.log("UpdateUser",user._id);
        //this.users[user._id - 1] = user;
      }
      deleteUser(id:number){
        console.log("Deleting User");
        this.users.forEach((element,index)=> {
          if(element._id==id) this.users.splice(index,1);
        });
        
      }
    
}