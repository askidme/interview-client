import { HttpInterceptorFn } from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  // Clone the request and add the Authorization header if the token exists
  const authReq = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
    withCredentials: true, // Required if backend CORS allows credentials
  });
  const router = inject(Router);
  return next(authReq).pipe(
    catchError((error) => {

      // Optionally handle errors
      if (error.status === 401 || error.status === 403) { // Check for 401 Unauthorized status
        console.error('Unauthorized! Redirecting to login.');
        localStorage.removeItem("token");
        router.navigate(['/login']); // Redirect to your login route
      } else {
        console.error('Request error!:', error);
        // Handle other errors as needed (e.g., show a message to the user)
      }
      return throwError(() => error);
    })
  );
};
