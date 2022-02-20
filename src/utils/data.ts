import { Administrativo } from '../models/administrativo.model.js';
import { Cliente } from '../models/cliente.model.js';
import { Empleado } from '../models/empleado.model.js';
import { Producto } from '../models/producto.model.js';
import { Proveedor } from '../models/proveedor.model.js';
import { Vendedor } from '../models/vendedor.model.js';
import { Venta } from '../models/ventas.model.js';


const leFit: Proveedor = new Proveedor('P0001', 'Nicolas', 'Gomez', '2345678');
const canvas: Proveedor = new Proveedor('P0002', 'Carlos', 'Alvarez', '1234567');
const gda: Proveedor = new Proveedor('P0003', 'Martín', 'Ramirez', '25456367');
const vaqFel: Proveedor = new Proveedor('P0004', 'Roberto', 'Sanchez', '45323432');
const leafCo: Proveedor = new Proveedor('P0005', 'Javier', 'Martinez', '45324323');

const prod1: Producto = new Producto('X0001', 'Manteca de maní', 200,'P0001');
const prod2: Producto = new Producto('X0002', 'Semilla de lino', 10.5,'P0001');
const prod3: Producto = new Producto('X0003', 'Batatas de caucho', 32.71,'P0002');
const prod4: Producto = new Producto('X0004', 'Milanesa de soja', 332.8,'P0004');
const prod5: Producto = new Producto('X0005', 'Pollo vegetal', 430.1,'P0005');
const prod6: Producto = new Producto('X0006', 'Carne vegetal', 150,'P0005');
const prod7: Producto = new Producto('X0007', 'Pepas de membrillo', 69.5,'P0003');

const juan: Administrativo = new Administrativo('A0001', 'Juan', 'Scap', '123456798');
const lorenzo: Administrativo = new Administrativo('A0002', 'Lorenzo', 'Scap', '614325675');
const mariela: Vendedor = new Vendedor('V0001', 'Mariela', 'Scap', '9876543213');
const valentino: Vendedor = new Vendedor( 'V0002', 'Valentino', 'Scaparro', '6787544453');
const carlos: Vendedor = new Vendedor('V0003', 'Carlos', 'Carlitos', '34212344');

const cliente1: Cliente = new Cliente('C0001', 'Carlos', 'Esperanza', '23456789');
const cliente2: Cliente = new Cliente('C0002', 'Ernesto', 'Gonzalez', '54367889');
const cliente3: Cliente = new Cliente('C0003', 'Giorgio', 'Spazza', '34567654');

const venta1: Venta = new Venta('VT0001', String(prod1.precio), cliente2.id, valentino.id );
const venta2: Venta = new Venta('VT0002', String(prod4.precio), cliente1.id, mariela.id);
const venta3: Venta = new Venta('VT0003', String(prod5.precio), cliente2.id, mariela.id);


export const providersMock: Proveedor[] = [ leFit, canvas, gda, vaqFel, leafCo ];
export const productsMock: Producto[] = [ prod1, prod2, prod3, prod4, prod5, prod6, prod7 ];
export const empleados: Empleado[] = [ juan, mariela ];
export const customersMock: Cliente[] = [ cliente1, cliente2, cliente3 ];
export const administrativesMock: Administrativo[] = [juan, lorenzo];
export const sellersMock: Vendedor[] = [mariela, valentino, carlos];
export const salesMock: Venta[] = [venta1, venta2, venta3];


export const prefixObj = {
  sale: "VT",
  administrative: 'A',
  seller: 'V',
  product: 'X',
  dealer: 'P',
  customer: 'C'
};

export const totalDigits: number = 4