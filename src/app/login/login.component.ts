import { Component, OnInit } from '@angular/core';
import { LoginViewModel } from '../login-view-model.model';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginViewModel: LoginViewModel = new LoginViewModel();
  loginError: string = '';
  constructor(private loginService: LoginService, private router: Router) {}
  ngOnInit() {}

  onLoginClick(event: any) {
    this.loginService.Login(this.loginViewModel).subscribe({
      next: (response) => {
        this.router.navigate(['/admin', 'dashboard']);
      },
      error: (err) => {
        console.log(err);
        this.loginError = 'Invalid Username or Password';
      },
    });
  }
}
