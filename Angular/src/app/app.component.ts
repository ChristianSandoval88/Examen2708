import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink,CommonModule],
  template: `
    <div class="container">
      <h1>Examen</h1>
      <div class="flex" style="justify-content: space-between;">
        <nav class="flex" style="gap: 1rem;">
          <a routerLink="/articulos">Artículos</a>
          <a routerLink="/clientes">Clientes</a>
          <a routerLink="/tiendas">Tiendas</a>
          <a routerLink="/carrito">Carrito</a>
          <a routerLink="/login">Login</a>
        </nav>
        <div *ngIf="auth.isLoggedIn(); else loggedOut">
          <span>Sesión activa</span>
          <button (click)="logout()">Salir</button>
        </div>
        <ng-template #loggedOut><span>No autenticado</span></ng-template>
      </div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor(public auth: AuthService) {}
  logout(){ this.auth.logout(); }
}
