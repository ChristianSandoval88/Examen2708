import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>Clientes</h2>
      <div class="row">
      <form (ngSubmit)="save()" class="flex">
        <div class="form-group">
        <label for="nombre">Nombre</label><br>
        <input [(ngModel)]="form.nombre" name="nombre" placeholder="Nombre" required />
        </div>
        <div class="form-group">
        <label for="imagen">Apellido</label><br>
        <input [(ngModel)]="form.apellido" name="apellido" placeholder="Apellido" required />
        </div>
        <div class="form-group">
        <label for="imagen">Direccion</label><br>
        <input [(ngModel)]="form.direccion" name="direccion" placeholder="Dirección" required />
        </div>
        <div class="form-group">
        <br>
        <button type="submit">{{ form.id ? 'Actualizar' : 'Guardar' }}</button>
        </div>
        </form>
      </div>

      <table>
        <thead><tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Dirección</th><th>Acciones</th></tr></thead>
        <tbody>
          <tr *ngFor="let p of clientes">
            <td>{{p.id}}</td>
            <td>{{p.nombre}}</td>
            <td>{{p.apellido}}</td>
            <td>{{p.direccion}}</td>
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
export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  form: any = { id: 0, nombre: '', apellido: '', direccion:'' };
  constructor(private api: ClientesService) {}
  ngOnInit(){ this.load(); }
  load(){ 
    this.api.getAll().subscribe(r => this.clientes = r as any[]); 
  }
  edit(p: any){ this.form = { ...p }; }
  reset(){ this.form = { id: 0, nombre: '', apellido: '', direccion:'' }; }
  save(){
    if(this.form.id){
      this.api.update(this.form.id, this.form).subscribe(() => { this.reset(); this.load(); });
    } else {
      this.api.create(this.form).subscribe(() => { this.reset(); this.load(); });
    }
  }
  remove(id: number){ this.api.delete(id).subscribe(() => this.load()); }
}
