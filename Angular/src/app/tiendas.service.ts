import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TiendasService {
  private apiUrl = 'https://localhost:7053/api/Tiendas';
  constructor(private http: HttpClient) {}
  getAll(){ return this.http.get<any[]>(this.apiUrl); }
  create(p:any){ return this.http.post(this.apiUrl, p); }
  update(id:number, p:any){ return this.http.put(`${this.apiUrl}/${id}`, p); }
  delete(id:number){ return this.http.delete(`${this.apiUrl}/${id}`); }
}
