import { HttpInterceptorFn } from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // Retrieve the token
  // Clone the request and add the Authorization header if the token exists
  const authReq = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
    withCredentials: true, // Required if backend CORS allows credentials
  });
  return next(authReq).pipe(
    catchError((error) => {
      // Optionally handle errors
      console.error('Request error!:', error);
      return throwError(() => error);
    })
  );
};
