import { Articulos } from "./articulos";
import { Clientes } from "./clientes";

export class ClientesArticulos {
  public constructor(public id: number,public clienteid: number,public clientes: Clientes,public articuloid: number,public articulos: Articulos) {}
}
