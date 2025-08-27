import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientesArticulos } from '../entities/clientes_articulos';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private apiUrl = 'https://localhost:7053/api/ClientesArticulos';
  constructor(private http: HttpClient) {}
  getAll(){ return this.http.get<ClientesArticulos[]>(this.apiUrl); }
  create(p:any){ return this.http.post(this.apiUrl, p); }
  update(id:number, p:any){ return this.http.put(`${this.apiUrl}/${id}`, p); }
  delete(id:number){ return this.http.delete(`${this.apiUrl}/${id}`); }
}
