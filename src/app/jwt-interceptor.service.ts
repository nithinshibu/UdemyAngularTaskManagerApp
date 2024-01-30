import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var currentuser = { token: '' };
    var headers = new HttpHeaders();
    const currentUserString = sessionStorage.getItem('currentuser');

    if (currentUserString !== null && currentUserString !== undefined) {
      currentuser = JSON.parse(currentUserString);
    }
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + currentuser.token,
      },
    });

    return next.handle(req);
  }
}
