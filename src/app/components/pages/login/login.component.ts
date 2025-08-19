import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';

  dataemail = 'admin11@gmail.com';
  datapass = '123';
  constructor(
    private router: Router,
  ){}
    onLogin() {
    if (!this.email || !this.password) {
      alert('Username dan password harus diisi!');
      return;
    }
    if (this.email !=this.dataemail || this.password != this.datapass) {
      alert('Username dan password belum sesuai!');
      return;
    }
    if(this.email === this.dataemail && this.password === this.datapass ){
      this.router.navigateByUrl('/home');
    }
    console.log('Login dengan:', this.email, this.password);
    // TODO: panggil API login di sini
  }


}
