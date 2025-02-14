import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap  } from 'rxjs';
import {User} from '../../model/user.model';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/users';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  constructor(private http: HttpClient) {
    // Check for existing token on initialization (e.g., from localStorage)
    const token = localStorage.getItem('token');
    this.isAuthenticatedSubject.next(!!token); // Set initial value
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => { // Type the response (important!)
        localStorage.setItem('token', response.token);
        this.isAuthenticatedSubject.next(true); // Update authentication status
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Check if token exists
  }

  logout(): void {
    localStorage.removeItem('token'); // Clear the token on logout
    this.isAuthenticatedSubject.next(false);
  }

  getUser(): User {
    const token = localStorage.getItem('token'); // Retrieve the token
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.userId;
      const firstname = decodedToken.firstname;
      const lastname = decodedToken.lastname;
      const email = decodedToken.email;
      let user = {id: userId, email: email, password: '', firstname: firstname, lastname: lastname};
      // console.log(`user: ${JSON.stringify(user)}`);
      return user;
    }
    return null;
  }
}
