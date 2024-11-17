import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthRepository } from './auth-repository.service';

interface DecodedToken {
  username: string;
  exp?: number;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private authRepository: AuthRepository) {}

  login(username: string, password: string): Observable<any> {
    return this.authRepository.login(username, password);
  }

  signup(username: string, password: string): Observable<any> {
    return this.authRepository.signup(username, password);
  }

  hello(): Observable<any> {
    return this.authRepository.hello();
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getCurrentUser(): DecodedToken | null {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('User not logged in');
      return null;
    }

    return jwtDecode<DecodedToken>(token);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      const { exp } = jwtDecode<DecodedToken>(token);
      if (!exp) return false;

      const isTokenValid = exp > Math.floor(Date.now() / 1000);
      console.log('Token expiration date:', new Date(exp * 1000));
      console.log('Token is valid?', isTokenValid);
      return isTokenValid;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }
}
