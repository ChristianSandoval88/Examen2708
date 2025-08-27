import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login.component';
import { ArticulosComponent } from './app/articulos.component';
import { ClientesComponent } from './app/clientes.component';
import { TiendasComponent } from './app/tiendas.component';
import { CarritoComponent } from './app/carrito.component';
import { AuthGuard } from './app/auth.guard';
import { TokenInterceptor } from './app/token.interceptor';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'articulos', component: ArticulosComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
  { path: 'tiendas', component: TiendasComponent, canActivate: [AuthGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'articulos' },
  { path: '**', redirectTo: 'articulos' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
}).catch(err => console.error(err));
