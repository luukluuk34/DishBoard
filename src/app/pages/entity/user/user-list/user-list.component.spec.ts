import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { of } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

import { UserListComponent } from './user-list.component';
let component: UserListComponent;
let fixture: ComponentFixture<UserListComponent>;
let service: jasmine.SpyObj<UserService>;
let httpSpy: jasmine.SpyObj<HttpClient>;
let routeSpy: jasmine.SpyObj<ActivatedRoute>;

const expectedUserList: User[] = [
  {
      _id: 'mongo_id',
      firstName: 'luuk',
      lastName:'Bartels',
      email: 'luuk-bartels@hotmail.com',
      about: 'test',
      dateOfBirth: new Date(1997, 2, 16),
  },
  {
    _id: 'mongo_id_2',
    firstName: 'Maurice',
    lastName:'de Ridder',
    email: 'maurice-ridder@hotmail.com',
    about: 'test',
    dateOfBirth: new Date(2002, 2, 16),
  },    
];


describe('UserListComponent', () => {


  beforeEach(async () => {

  });

  beforeEach(() => {
    service = jasmine.createSpyObj('UserService', ['getList', 'delete', 'handleError']);
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
     TestBed.configureTestingModule({
        providers: [
          { provide: HttpClient, useValue: httpSpy },
          {provide:UserService, use:service},
          {provide:ActivatedRoute, useValue:{params:of({id:"mongo_id"})}}],
        declarations: [ UserListComponent ]
      }).compileComponents();
      fixture = TestBed.createComponent(UserListComponent);
      component = fixture.componentInstance;
  });

  fit('should create', () => {
    console.log('FIT test',expectedUserList);
    
    httpSpy.get.and.returnValue(of(expectedUserList));
    fixture.detectChanges();

		expect(component).toBeTruthy();
		expect(component.userList).toEqual(expectedUserList);
		expect(component.userList.length).toEqual(expectedUserList.length);
  });

  // fit('should delete', () => {
  //   httpSpy.get.and.returnValue(of(expectedUserList));
  //   fixture.detectChanges();

	// 	expect(component).toBeTruthy();
  //   expect(component.deleteUser(expectedUserList[0])).toBeTruthy();
  //   expect(component.userList).not.toEqual(expectedUserList)
  // })
});
