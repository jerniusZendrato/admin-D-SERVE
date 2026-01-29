import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../models/unit.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials: LoginRequest = { username: '', password: '' };
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}


  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (!this.credentials.username || !this.credentials.password) {
      this.error = 'Username dan password harus diisi!';
      return;
    }
    
    this.loading = true;
    this.error = '';
    
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        const user = response.data?.user || response.user;
        if (user?.role === 'ADMIN') {
          this.router.navigate(['/home']);
        } else {
          this.authService.logout();
          this.error = 'Akses ditolak. Hanya admin yang dapat login.';
          this.loading = false;
        }
      },
      error: (error) => {
        this.error = 'Username atau password salah';
        this.loading = false;
      }
    });
  }
}
