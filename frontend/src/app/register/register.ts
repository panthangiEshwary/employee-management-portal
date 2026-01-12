import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  firstName = '';
  lastName = '';
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  updateFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`.trim();
  }

  onRegister() {

    if (!this.fullName || !this.email || !this.password) {
      alert('All fields are required');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const payload = {
      name: this.fullName,
      email: this.email,
      password: this.password
    };

    this.http.post(
      '/api/auth/register',
       payload,
      { responseType: 'text' }
    ).subscribe({
      next: () => {
        alert('Registration successful. Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Register error:', err);
        alert(err?.error || 'Registration failed');
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
