import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {tap} from 'rxjs';


@Component({
  selector: 'app-login',
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value)
        .pipe(
          tap((response) => {
            localStorage.setItem('token', response.token); // Save the token
            alert('Login successful!');
            // this.router.navigate(['/']);
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            console.log(`returnUrl - ${returnUrl}`);
            this.router.navigate([returnUrl]);
          })
        )
        .subscribe({
          error: (error) => {
            console.error('Login failed', error);
            alert('Invalid email or password. Please try again.');
          },
        });
    }
  }
}
