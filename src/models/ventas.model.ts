export class Venta  {

  id: string;
  importe: number;
  idCliente: string;
  idVendedor: string;

  constructor( _id: string,_importe: string, _idCliente: string,  _idVendedor: string ){
    this.id = _id;
    this.importe =  Number(_importe);
    this.idCliente = _idCliente;
    this.idVendedor = _idVendedor;
  }

}