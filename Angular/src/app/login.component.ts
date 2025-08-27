import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>Login</h2>
      <form (ngSubmit)="submit()">
        <div class="flex">
          <label style="width:100px">Usuario</label>
          <input [(ngModel)]="username" name="username" required type="email" />
        </div>
        <div class="flex">
          <label style="width:100px">Password</label>
          <input [(ngModel)]="password" name="password" type="password" required />
        </div>
        <button type="submit">Entrar</button>
        <p *ngIf="error" style="color:#b91c1c; margin-top:.5rem;">{{error}}</p>
      </form>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  constructor(private auth: AuthService, private router: Router) {}
  submit(){
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/articulos']),
      error: () => this.error = 'Email o contraseña incorrectos'
    });
  }
}
