import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginViewModel } from './login-view-model.model';
import { Observable, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SignUpViewModel } from './sign-up-view-model.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private httpClient: HttpClient | null = null;

  constructor(
    private httpBackend: HttpBackend,
    private jwtHelperService: JwtHelperService
  ) {}

  currentUserName: any = null;
  xsrfReqToken: any = null;

  public Login(loginViewModel: LoginViewModel): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);

    return this.httpClient
      .post<any>('/authenticate', loginViewModel, {
        responseType: 'json',
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (response) {
            this.currentUserName = response.body.userName;
            sessionStorage.setItem(
              'currentuser',
              JSON.stringify(response.body)
            );

            this.xsrfReqToken = response.headers.get('Xsrf-Request-Token');

            sessionStorage.setItem('Xsrf-Request-Token', this.xsrfReqToken);
          }
          return response.body;
        })
      );
  }
  public Register(signupViewModel: SignUpViewModel): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);

    return this.httpClient
      .post<any>('/register', signupViewModel, {
        responseType: 'json',
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (response) {
            this.currentUserName = response.body.userName;
            sessionStorage.setItem(
              'currentuser',
              JSON.stringify(response.body)
            );

            this.xsrfReqToken = response.headers.get('Xsrf-Request-Token');

            sessionStorage.setItem('Xsrf-Request-Token', this.xsrfReqToken);
          }
          return response.body;
        })
      );
  }

  getUserByEmail(email: string): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<any>('/api/getUserByEmail/' + email, {
      responseType: 'json',
    });
  }

  public Logout() {
    sessionStorage.clear();
    this.currentUserName = null;
  }

  public isAuthenticated(): boolean {
    var token = sessionStorage.getItem('currentuser')
      ? JSON.parse(sessionStorage.getItem('currentuser') as string).token
      : null;

    if (token && !this.jwtHelperService.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }
}
