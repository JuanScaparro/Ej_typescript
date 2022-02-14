export class Producto {
    constructor(_id, _descripcion, _precio, _idProveedor) {
        this.id = _id;
        this.idProveedor = _idProveedor;
        this.descripcion = _descripcion;
        this.precio = _precio;
    }
}
