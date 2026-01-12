import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css']
})
export class AdminLoginComponent {

  // Login fields
  username = '';
  password = '';
  error = '';

  // Forgot password modal fields
  showForgotModal = false;
  resetEmail = '';
  newPassword = '';
  confirmPassword = '';
  errorMsg = '';

  constructor(private router: Router, private service: LoginService) {}

  // ADMIN LOGIN (BACKEND WILL HANDLE VALIDATION)
  loginAsAdmin() {
    if (!this.username || !this.password) {
      this.error = 'Please enter username and password';
      return;
    }

    const payload = {
      email: this.username,
      password: this.password
    };

    this.service.login(payload).subscribe({
      next: (res: any) => {
        alert('Login successfully');

        // ✅ STORE FIRST (CRITICAL FIX)
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', 'ADMIN');

        console.log('Login success', res);

        // ✅ NAVIGATE LAST
        this.router.navigate(['/admin-dashboard']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.error = 'Invalid admin credentials';
      }
    });
  }

  // OPEN FORGOT PASSWORD MODAL
  forgotPassword() {
    this.showForgotModal = true;
    this.errorMsg = '';
  }

  // RESET PASSWORD (BACKEND RESPONSIBILITY)
  resetPassword() {
    if (!this.resetEmail || !this.newPassword || !this.confirmPassword) {
      this.errorMsg = 'All fields are required';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMsg = 'Passwords do not match';
      return;
    }

    alert('Password reset request sent');
    this.closeModal();
  }

  // CLOSE MODAL
  closeModal() {
    this.showForgotModal = false;
    this.resetEmail = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.errorMsg = '';
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
