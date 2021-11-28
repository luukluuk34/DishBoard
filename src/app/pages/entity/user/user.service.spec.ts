import { HttpClient} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { User } from './user.model';
import { of } from 'rxjs';
// Global mock objects
const expectedUserData: User = {
    _id: 'mongo_id_12',
    firstName: 'laura',
    lastName:'Bartels',
    email: 'laura-bartels@hotmail.com',
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
        httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete','update']);
        TestBed.configureTestingModule({
            providers: [{ provide: HttpClient, useValue: httpSpy },{provide:UserService}],
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
    fit('should return a list of users', (done: DoneFn) => {
        httpSpy.get.and.returnValue(of(expectedUserList));
    
        service.getList().subscribe((users: User[]) => {
          console.log(users);
          expect(users.length).toBe(1);
          expect(users[0]._id).toEqual(expectedUserList[0]._id);
          done();
        });
    });

    //Testing happyflow getById
    fit('should return a user', (done: DoneFn) => {
        httpSpy.get.and.returnValue(of(expectedUserList[0]));
    
        service.getById("mongo_id").subscribe((user: User) => {
          console.log(user);
          expect(user._id).toEqual(expectedUserList[0]._id);
          done();
        });
    });
    
    //Testing happyflow of create
    fit('should create a user', (done:DoneFn) => {
      httpSpy.post.and.returnValue(of(expectedUserList[0]));
      service.create(expectedUserList[0]).subscribe((user:User) => {
        expect(user._id).toEqual(expectedUserList[0]._id);
        done();
      });
    });

    //Testing happyflow of update
    //TODO fix cannot read property
    // fit('should update a user', (done: DoneFn) => {
    //   httpSpy.put.and.returnValue(of(expectedUserList[0]));
    //   service.update(expectedUserList[0], expectedUserList[0]._id).subscribe((users: User) => {
    //     expect(expectedUserList[0]._id).toEqual(expectedUserList[0]._id);
    //     done();
    //   });
    // });
    
    //Testing happyflow of delete
    fit('should delete a user', (done:DoneFn) => {
      httpSpy.delete.and.returnValue(of(expectedUserList[0]));
      service.delete(expectedUserList[0]._id).subscribe((users: User) => {
        expect(users._id).toEqual(expectedUserList[0]._id);
        done();
      });
    });

});