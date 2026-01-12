import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';

  showReset = false;
  resetEmail = '';
  newPassword = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  onLogin() {
    //this.http.post<any>('http://localhost:8080/api/auth/login', {
      this.http.post<any>('/api/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role.toUpperCase());
        localStorage.setItem(
          'user',
          JSON.stringify({
            name: res.name,
            email: res.email
          })
        );

        if (res.role.toUpperCase() === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/employee-dashboard']);
        }
      },
      error: () => alert('Login failed')
    });
  }

  forgotPassword() {
    this.showReset = true;
  }

  resetPassword() {
    this.http.put(
      '/api/auth/reset-password',
      //'http://localhost:8080/api/auth/reset-password',
      {
        email: this.resetEmail,
        newPassword: this.newPassword
      },
      { responseType: 'text' }
    ).subscribe({
      next: () => {
        alert('Password updated');
        this.cancelReset();
      },
      error: () => alert('Reset failed')
    });
  }

  // ✅ THIS METHOD WAS MISSING — NOW FIXED
  cancelReset() {
    this.showReset = false;
    this.resetEmail = '';
    this.newPassword = '';
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
