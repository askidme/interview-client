import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {CommonModule} from '@angular/common';
;
import {BehaviorSubject, Observable, tap} from 'rxjs';


@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true
})
export class LoginComponent {
  loginForm: FormGroup;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

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
        .subscribe({
          next: () => { // Use next instead of tap here
            alert('Login successful!');
            this.authService.getUser(); // If needed
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]); // Navigate after successful login
          },
          error: (error) => {
            console.error('Login failed', error);
            alert('Invalid email or password. Please try again.');
          },
        });
    }
  }
}
