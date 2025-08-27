import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticuloService } from './articulos.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>Articulos</h2>
      <div class="row">
      <form (ngSubmit)="save()" class="flex">
        <div class="form-group">
        <label for="descripcion">Descripción</label>
        <input [(ngModel)]="form.descripcion" name="descripcion" placeholder="Descripción" required />
        </div>
        <div class="form-group">
        <label for="precio">Precio</label>
        <input [(ngModel)]="form.precio" name="precio" type="number" step="0.01" placeholder="Precio" required />
        </div>
        <div class="form-group">
        <label for="imagen">Url Imagen</label>
        <input [(ngModel)]="form.imagen" name="imagen" placeholder="URL Imagen" required />
        </div>
        <div class="form-group">
        <label for="stock">Stock</label>
        <input [(ngModel)]="form.stock" name="stock" type="number" step="1" placeholder="Stock" required />
        </div>
        <div class="form-group">
        <label for="stock">Tienda</label>
        <select [(ngModel)]="form.tiendaId"  name="tiendaId">
          <option *ngFor="let tienda of tiendas" [value]="tienda.id">{{tienda.sucursal}}</option>
        </select>
        </div>
        <div class="form-group">
        <br>
        <button type="submit">{{ form.id ? 'Actualizar' : 'Guardar' }}</button>
        </div>
        </form>
      </div>

      <table>
        <thead><tr><th>ID</th><th>Descripcion</th><th>Precio</th><th>Imagen</th><th>Stock</th><th>Sucursal</th><th>Acciones</th></tr></thead>
        <tbody>
          <tr *ngFor="let p of articulos">
            <td>{{p.id}}</td>
            <td>{{p.descripcion}}</td>
            <td>{{p.precio | number:'1.2-2'}}</td>
            <td>{{p.imagen}}</td>
            <td>{{p.stock}}</td>
            <td>{{p.tiendaId}}</td>
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
export class ArticulosComponent implements OnInit {
  articulos: any[] = [];
  form: any = { id: 0, descripcion: '', precio: 0, imagen:'', stock:0 };
  tiendas: any[] = [];
  selectedTienda: any;
  constructor(private api: ArticuloService) {}
  ngOnInit(){ this.load(); }
  load(){ 
    this.api.getAll().subscribe(r => this.articulos = r as any[]); 
    this.api.getAllTiendas().subscribe(r => this.tiendas = r as any[]); 
  }
  edit(p: any){ this.form = { ...p }; }
  reset(){ this.form = { id: 0, name: '', price: 0 }; }
  save(){
    if(this.form.id){
      this.api.update(this.form.id, this.form).subscribe(() => { this.reset(); this.load(); });
    } else {
      this.api.create(this.form).subscribe(() => { this.reset(); this.load(); });
    }
  }
  remove(id: number){ this.api.delete(id).subscribe(() => this.load()); }
}
