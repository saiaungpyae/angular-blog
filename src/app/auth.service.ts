import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { User } from './user';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, public router: Router) { }

  login(user: User) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/login`, user)
      .toPromise()
      .then(res => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['home']);
      })
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getUserData() {
    return localStorage.getItem('user');
  }

  public isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    if (localStorage.removeItem('access_token') == null && localStorage.removeItem('user') == null) {
      this.router.navigate(['login']);
    }
  }
}
