import { Administrativo } from '../models/administrativo.model.js';
import { Cliente } from '../models/cliente.model.js';
import { Producto } from '../models/producto.model.js';
import { Proveedor } from '../models/proveedor.model.js';
import { Vendedor } from '../models/vendedor.model.js';
import { Venta } from '../models/ventas.model.js';
const leFit = new Proveedor('P0001', 'Nicolas', 'Gomez', '2345678');
const canvas = new Proveedor('P0002', 'Carlos', 'Alvarez', '1234567');
const gda = new Proveedor('P0003', 'Martín', 'Ramirez', '25456367');
const vaqFel = new Proveedor('P0004', 'Roberto', 'Sanchez', '45323432');
const leafCo = new Proveedor('P0005', 'Javier', 'Martinez', '45324323');
const prod1 = new Producto('X0001', 'Manteca de maní', 200, 'P0001');
const prod2 = new Producto('X0002', 'Semilla de lino', 10.5, 'P0001');
const prod3 = new Producto('X0003', 'Batatas de caucho', 32.71, 'P0002');
const prod4 = new Producto('X0004', 'Milanesa de soja', 332.8, 'P0004');
const prod5 = new Producto('X0005', 'Pollo vegetal', 430.1, 'P0005');
const prod6 = new Producto('X0006', 'Carne vegetal', 150, 'P0005');
const prod7 = new Producto('X0007', 'Pepas de membrillo', 69.5, 'P0003');
const juan = new Administrativo('A0001', 'Juan', 'Scap', '123456798');
const lorenzo = new Administrativo('A0002', 'Lorenzo', 'Scap', '614325675');
const mariela = new Vendedor('V0001', 'Mariela', 'Scap', '9876543213');
const valentino = new Vendedor('V0002', 'Valentino', 'Scaparro', '6787544453');
const carlos = new Vendedor('V0003', 'Carlos', 'Carlitos', '34212344');
const cliente1 = new Cliente('C0001', 'Carlos', 'Esperanza', '23456789');
const cliente2 = new Cliente('C0002', 'Ernesto', 'Gonzalez', '54367889');
const cliente3 = new Cliente('C0003', 'Giorgio', 'Spazza', '34567654');
const venta1 = new Venta('VT0001', prod1.precio, cliente2.id, valentino.id);
const venta2 = new Venta('VT0002', prod4.precio, cliente1.id, mariela.id);
const venta3 = new Venta('VT0003', prod5.precio, cliente2.id, mariela.id);
export const providersMock = [leFit, canvas, gda, vaqFel, leafCo];
export const productsMock = [prod1, prod2, prod3, prod4, prod5, prod6, prod7];
export const empleados = [juan, mariela];
export const customersMock = [cliente1, cliente2, cliente3];
export const administrativeMock = [juan, lorenzo];
export const sellersMock = [mariela, valentino, carlos];
export const saleMock = [venta1, venta2, venta3];
export const prefixObj = {
    sale: "VT",
    administrative: 'A',
    seller: 'V',
    product: 'X',
    dealer: 'P',
    customer: 'C'
};
export const totalDigits = 4;
