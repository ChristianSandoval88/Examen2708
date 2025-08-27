import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7053/api/auth';
  constructor(private http: HttpClient) {}

  login(email: string, password: string){
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(tap(res => {localStorage.setItem('token', res.token);}));
  }

  get token(){ return localStorage.getItem('token'); }
  isLoggedIn(){ return !!this.token; }
  logout(){ localStorage.removeItem('token'); }
}
