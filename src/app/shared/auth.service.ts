import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'https://reqres.in/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  userId = null;
  constructor(private http: HttpClient, public router: Router) {}
  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['home']);
        // this.getUserProfile(res.id).subscribe((res) => {
        //   this.currentUser = res;
        //   this.userId = res.id;
        //   this.router.navigate(['home']);
          // this.router.navigate(['user-profile/' + this.userId]);
        // });
      });
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }
  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/users/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res.data || {};
      }),
      catchError(this.handleError)
    );
  }

  deleteUser(id: any): Observable<any> {
    let api = `${this.endpoint}/users/${id}`;
    return this.http.delete(api, {headers: this.headers}).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getUsers(): Observable<any> {
    let api = `${this.endpoint}/users`;
    return this.http.get(api, {headers:this.headers}).pipe(
      map((res: any) => {
        const data = res.json();
        return data.data || {};
      }),
      catchError(this.handleError)
    )
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}