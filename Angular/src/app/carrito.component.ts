import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService } from './carrito.service';
import { ClientesArticulos } from '../entities/clientes_articulos';
import { ArticuloService } from './articulos.service';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>Carrito de compras</h2>
      <div class="row">
      <form (ngSubmit)="save()" class="flex">
        <div class="form-group">
        <label for="clienteId">Cliente</label><br>
        <select [(ngModel)]="form.clienteId"  name="clienteId">
          <option *ngFor="let cliente of clientes" [value]="cliente.id">{{cliente.nombre}} {{cliente.apellido}}</option>
        </select>
        </div>
        <div class="form-group">
        <label for="articuloId">Artículo</label><br>
        <select [(ngModel)]="form.articuloId"  name="articuloId">
          <option *ngFor="let articulo of articulos" [value]="articulo.id">{{articulo.descripcion}} ({{articulo.precio  | number:'1.2-2'}}$)</option>
        </select>
        </div>
        <div class="form-group">
        <br>
        <button type="submit">{{ form.id ? 'Actualizar' : 'Guardar' }}</button>
        </div>
        </form>
      </div>

      <table>
        <thead><tr><th>ID</th><th>Cliente</th><th>Artículo</th><th>Acciones</th></tr></thead>
        <tbody>
          <tr *ngFor="let p of clientesArticulos">
            <td>{{p.id}}</td>
            <td>{{p.clientes.nombre}} {{p.clientes.apellido}}</td>
            <td>{{p.articulos.descripcion}} ({{p.articulos.precio  | number:'1.2-2'}}$)</td>
            <td>
              <button (click)="edit(p)">Editar</button>&nbsp;
              <button (click)="remove(p.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class CarritoComponent implements OnInit {
  clientesArticulos: ClientesArticulos[] = [];
  clientes: any[] = [];
  articulos: any[] = [];
  form: any = { id: 0, clienteId: 0, articuloId:0 };
  constructor(private api: CarritoService, private articulosApi: ArticuloService, private clientesApi: ClientesService) {}
  ngOnInit(){ this.load(); }
  load(){ 
    this.api.getAll().subscribe(r => this.clientesArticulos = r as ClientesArticulos[]); 
    this.articulosApi.getAll().subscribe(r => this.articulos = r as any[]); 
    this.clientesApi.getAll().subscribe(r => this.clientes = r as any[]); 
  }
  edit(p: any){ this.form = { ...p }; }
  reset(){ this.form = {id: 0, clienteId: 0, articuloId:0 }; }
  save(){
    if(this.form.id){
      this.api.update(this.form.id, this.form).subscribe(() => { this.reset(); this.load(); });
    } else {
      this.api.create(this.form).subscribe(() => { this.reset(); this.load(); });
    }
  }
  remove(id: number){ this.api.delete(id).subscribe(() => this.load()); }
}



