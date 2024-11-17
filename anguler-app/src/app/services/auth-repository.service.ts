import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/login`, body, { headers });
  }

  signup(username: string, password: string): Observable<any> {
    const body = { username, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/signup`, body, { headers });
  }

  hello(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
