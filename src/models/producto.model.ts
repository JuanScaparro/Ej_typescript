export class Producto {
  id: string;
  idProveedor: string;
  descripcion: string;
  precio: number;

  constructor( _id: string, _descripcion: string, _precio: number, _idProveedor: string ) {
      this.id = _id;
      this.idProveedor = _idProveedor;
      this.descripcion = _descripcion;
      this.precio = _precio;
  }
  
}