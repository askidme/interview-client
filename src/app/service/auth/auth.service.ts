import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../../model/user.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  isAuthenticated(): boolean {
    console.log(`isAuthenticated: ${localStorage.getItem('token')}`);
    return !!localStorage.getItem('token'); // Check if token exists
  }

  logout(): void {
    localStorage.removeItem('token'); // Clear the token on logout
  }
}
