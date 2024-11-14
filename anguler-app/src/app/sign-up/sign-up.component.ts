import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../validators/password-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  SignUpForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordMatchValidator() }
  );
  errorMessage: string = '';
  invalid = false;

  constructor(private loginService: LoginService, private router: Router) {}
  get username() {
    return this.SignUpForm.get('username');
  }
  get password() {
    return this.SignUpForm.get('password');
  }
  get confirmPassword() {
    return this.SignUpForm.get('confirmPassword');
  }
  signup() {
    const { username, password } = this.SignUpForm.value;

    if (username && password) {
      this.loginService.signup(username, password).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.invalid = true;
          this.errorMessage =
            err.error?.error || 'An error occurred during signup';
        },
      });
    } else {
      this.invalid = true;
      this.errorMessage = 'Please enter both username and password';
    }
  }
}
