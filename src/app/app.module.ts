import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { AboutComponent } from './admin/about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AlertDirective } from './directives/alert.directive';
import { EmployeeModule } from './employee/employee.module';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { JwtUnAuthorizedInterceptorService } from './interceptors/jwt-un-authorized-interceptor.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    AlertDirective,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    EmployeeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem('currentuser')
            ? JSON.parse(sessionStorage.getItem('currentuser') as string).token
            : null;
        },
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtUnAuthorizedInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
