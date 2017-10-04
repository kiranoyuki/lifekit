import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {environment} from "../../environment/environment";
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import {User} from "../models/user.model";


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // todo: revisit this again
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getRefreshToken()) {
      this.apiService.get('/user')
      .subscribe(
        data => this.setAuth(data.user),
        err => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  isRegistered(){
    if(this.jwtService.getRefreshToken()){
      return(true);
    }else{
      return(false);
    }
  }

  setAuth(accessToken: string) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveAccessToken(accessToken);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyRefreshToken();
    this.jwtService.destroyAccessToken();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  signup(phone: string): Observable<any> {
    let path = `/user/signup?phone=${phone}`;
    this.currentUserSubject.value.phone = phone;
    return this.apiService.get(path);
  }

  validate(code: number): Observable<boolean> {
    return this._validate(this.currentUserSubject.value.phone, code);
  }

  _validate(phone: string, code: number): Observable<boolean> {
    let path = `/user/validate?phone=${phone}&code=${code}`
    return this.apiService.get(path)
      .map(
        res => {
          // save the refresh token for use in acquiring access token
          this.jwtService.saveRefreshToken(res.result);
          this.jwtService.saveTelephoneNumber(phone);
          return true;
        },
        err => { return false;}
      );
  }

  signin() {
    return this._signin(this.jwtService.getTelephoneNumber(), this.jwtService.getRefreshToken());
  }

  _signin(phone: string, token: string) {
    let path = `/user/signin?phone=${phone}&refreshToken=${token}`
    return this.apiService.get(path)3
      .map(
        res => {
          // Save the access token
          this.jwtService.saveAccessToken(res.result);

          // mark this user as signed in
          this.isAuthenticatedSubject.next(true);
          return res; // in case someone else needs it
        }
      );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

}
