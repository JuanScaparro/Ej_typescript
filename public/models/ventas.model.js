export class Venta {
    constructor(_id, _importe, _idCliente, _idVendedor) {
        this.id = _id;
        this.importe = Number(_importe);
        this.idCliente = _idCliente;
        this.idVendedor = _idVendedor;
    }
}
