import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'admin-D-SERVE';
  // isAuthenticated = false;

  isAuthenticated = true; // contoh, nanti bisa pakai auth service
  isMenuOpen = false;

  constructor(private authService: AuthService, private router: Router, public toastService: ToastService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
