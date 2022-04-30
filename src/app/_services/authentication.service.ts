import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  public token: string;
  public refresh_token: string;
  public headers: HttpHeaders;
  public readonly apiUrl = environment.API_BASE_URL;

  constructor(public http: HttpClient) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('user'));
    this.token = currentUser && currentUser.token;
    this.refresh_token = currentUser && currentUser.refresh_token;
  }

  isLoggedIn() {
    if (localStorage.getItem('user')) {
      return true;
    }
    return false;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(this.apiUrl + 'auth/login', {
        email: email,
        password: password
      })
      .pipe(
        map((response: Response) => {
          this.token = response['tokens']['access']['token'];
          this.refresh_token = response['tokens']['refresh']['token'];
          let expiresIn = response['tokens']['access']['expires'];
          if (
            (this.token && (response['user']['role'] === 'user') ||
            response['user']['role'] === 'artist')
          ) {
            // store expiresIn and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(
              'user',
              JSON.stringify({
                expires_in: expiresIn,
                token: this.token,
                refresh_token: this.refresh_token,
                email: response['user']['email'],
                name: response['user']['name'],
                role: response['user']['role'],
                profile_pic: response['user']['profile_pic'],
                email_verified_at: response['user']['email_verified_at'],
                id: response['user']['id'],
              })
            );
          }
          return response;
        })
      );
  }

  register(username: string, email: string, password: string, role: string): Observable<any> {
    return this.http
      .post(this.apiUrl + 'auth/register', {
        email: email,
        name: username,
        password: password,
        role: role,
      })
      .pipe(
        map((response: Response) => {
          // register successful if there's a jwt token in the response
          return response;
        })
      );
  }

  logout(): Observable<any>  {
    // clear token remove user from local storage to log user out
    console.log(this.refresh_token);
    return this.http
      .post(this.apiUrl + 'auth/logout', { refreshToken: this.refresh_token })
      .pipe(
        map((response: Response) => {
          console.log(response);
          this.token = null;
          this.refresh_token = null;
          localStorage.removeItem('user');
          return response;
        })
      );
  }

  sendPasswordResetEmail(email: string): Observable<any> {
    return this.http
      .post(this.apiUrl + 'auth/forgot-password', { email: email })
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  resetPassword(
    newPassword: string,
    token: string
  ): Observable<any> {
    return this.http
      .post(`${this.apiUrl}auth/reset-password?token=${token}`, {
        password: newPassword,
      })
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

   emailVerifcation(
    token: string
  ): Observable<any> {
    return this.http
      .get(`${this.apiUrl}auth/email-verification/${token}`)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
}
