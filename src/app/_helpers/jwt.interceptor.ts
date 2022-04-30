import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public headers: HttpHeaders;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (

      request.url.includes(environment.API_BASE_URL) ||
      request.url.includes(environment.IMG_BASE_URL)
      // request.url.includes('https://memeexhibit.com/api') ||
      // request.url.includes('https://api.memeexhibit.com') ||
      // request.url.includes('http://localhost:3001') ||
      // request.url.includes('http://localhost:3000') ||
      // request.url.includes('http://15.207.100.113:3001') ||
      // request.url.includes('http://147.182.187.164:3001')
    ) {
      // append headers
      this.headers = new HttpHeaders();
      this.headers.set('Content-Type', 'application/json');
      this.headers.set('Access-Control-Allow-Origin', '*');
      this.headers.set(
        'Access-Control-Allow-Headers',
        'Origin, Authorization, Content-Type, Accept'
      );

      request = request.clone({
        headers: this.headers,
      });

      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser && currentUser.token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
      }
      // add authorization header with jwt token if available
    }

    return next.handle(request);
  }
}
