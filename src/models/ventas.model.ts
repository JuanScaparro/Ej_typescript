export class Venta  {

  id: string;
  importe: number;
  idCliente: string;
  idVendedor: string;

  constructor( _id: string,_importe: number, _idCliente: string,  _idVendedor: string ){
    this.id = _id;
    this.importe = _importe;
    this.idCliente = _idCliente;
    this.idVendedor = _idVendedor;
  }

}