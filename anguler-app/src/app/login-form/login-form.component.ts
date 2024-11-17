import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  LoginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl('', Validators.required),
  });
  errorMessage: string = '';
  invalid = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  get username() {
    return this.LoginForm.get('username');
  }
  get password() {
    return this.LoginForm.get('password');
  }
  login() {
    const { username, password } = this.LoginForm.value;

    if (username && password) {
      this.loginService.login(username, password).subscribe({
        next: (response) => {
          if (response && response.token) {
            console.log(response);
            let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
            localStorage.setItem('token', response.token);
            this.router.navigate([returnUrl || '/']);
            this.invalid = false;
          } else {
            this.invalid = true;
            this.errorMessage = 'Invalid login credentials';
          }
        },
        error: (err) => {
          this.invalid = true;
          this.errorMessage = 'An error occurred during login';
          console.error(err);
        },
      });
    } else {
      this.invalid = true;
      this.errorMessage = 'Please enter both username and password';
    }
  }
}
