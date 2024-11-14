import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
interface DecodedToken {
  username: string;
  exp?: number;
  role: string;
}
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API URL

  constructor(private http: HttpClient) {}
  hello() {
    return this.http.get(this.apiUrl);
  }
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/login`, body);
  }
  signup(username: string, password: string): Observable<any> {
    const body = { username, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/signup`, body);
  }
  logout() {
    localStorage.removeItem('token');
  }
  getCurruntUser(): DecodedToken | null {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('User not logged in');
      return null;
    }

    return jwtDecode<DecodedToken>(token);
  }
  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
      // console.log('User not logged in');
      return false;
    }

    try {
      const { exp } = jwtDecode(token);
      if (!exp) return false;
      console.log(jwtDecode(token));
      const isTokenValid = exp > Math.floor(Date.now() / 1000);
      console.log('Token expiration date:', new Date(exp * 1000));
      console.log('tokon is valid?', isTokenValid);
      return isTokenValid;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }
}
