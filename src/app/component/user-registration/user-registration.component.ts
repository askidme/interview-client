import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';

import {AuthService} from '../../service/auth/auth.service';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {User} from '../../model/user.model';


@Component({
  selector: 'app-user-registration',
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css',
  standalone: true
})
export class UserRegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const user: User = this.registrationForm.value; // Map form values to User model
      this.authService.register(user).subscribe(
        () => {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed', error);
          alert('Registration failed. Please try again.');
        }
      );
    }
  }
}
