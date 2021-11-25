import { HttpClient} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { User } from './user.model';
import { of } from 'rxjs';
// Global mock objects
const expectedUserData: User = {
    _id: 'mongo_id',
    firstName: 'luuk',
    lastName:'Bartels',
    email: 'luuk-bartels@hotmail.com',
    about: 'test',
    dateOfBirth: new Date("1997-02-16"),
  };
  
  const expectedUserList: User[] = [
    {
        _id: 'mongo_id',
        firstName: 'luuk',
        lastName:'Bartels',
        email: 'luuk-bartels@hotmail.com',
        about: 'test',
        dateOfBirth: new Date("1997-02-16"),
    },    
  ];
  

describe('UserService', () => {
    let service: UserService;
    let httpSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
        TestBed.configureTestingModule({
            providers: [{ provide: HttpClient, useValue: httpSpy }],
          });
        service = TestBed.inject(UserService);
        httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    });

    
    it('UserService is expected', () => {
        expect(service).toBeTruthy();
    });
    it('HttpClientTesting is expected', () => {
        expect(httpSpy).toBeTruthy();
    });
    //Testing happyflow of getList()
    it('should return a list of users', (done: DoneFn) => {
        httpSpy.get.and.returnValue(of(expectedUserList));
    
        service.getList().subscribe((users: User[]) => {
          console.log(users);
          expect(users.length).toBe(1);
          expect(users[0]._id).toEqual(expectedUserList[0]._id);
          done();
        });
    });
    //Testing unhappyflow of getList()

    //Testing happyflow getById
    it('should return a user', (done: DoneFn) => {
        httpSpy.get.and.returnValue(of(expectedUserData));
    
        service.getById(expectedUserData._id).subscribe((user: User) => {
          console.log(user);
          expect(user._id).toEqual(user._id);
          done();
        });
    });

    //Testing unhappyflow getByID

    //Testing happyflow of delete
    //Testing unhappyflow of delete

    //Testing happyflow of create
    //Testing unhappyflow of create

    //Testing happyflow of update
    //Testing unhappyflow of update



});