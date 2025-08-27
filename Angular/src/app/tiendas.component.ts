import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TiendasService } from './tiendas.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>Tiendas</h2>
      <div class="row">
      <form (ngSubmit)="save()" class="flex">
        <div class="form-group">
        <label for="nombre">Sucursal</label><br>
        <input [(ngModel)]="form.sucursal" name="nombre" placeholder="Sucursal" required />
        </div>
        <div class="form-group">
        <label for="imagen">Dirección</label><br>
        <input [(ngModel)]="form.direccion" name="apellido" placeholder="Dirección" required />
        </div>
        <div class="form-group">
        <br>
        <button type="submit">{{ form.id ? 'Actualizar' : 'Guardar' }}</button>
        </div>
        </form>
      </div>

      <table>
        <thead><tr><th>ID</th><th>Sucursal</th><th>Dirección</th><th>Acciones</th></tr></thead>
        <tbody>
          <tr *ngFor="let p of tiendas">
            <td>{{p.id}}</td>
            <td>{{p.sucursal}}</td>
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
export class TiendasComponent implements OnInit {
  tiendas: any[] = [];
  form: any = { id: 0, nombre: '', apellido: '', direccion:'' };
  constructor(private api: TiendasService) {}
  ngOnInit(){ this.load(); }
  load(){ 
    this.api.getAll().subscribe(r => this.tiendas = r as any[]); 
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
