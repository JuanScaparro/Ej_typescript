import { providersMock, productsMock } from '../utils/data.js';
// FUNCIONALIDAD
function getProveedorPorProducto(idProducto) {
    const producto = productsMock.find(prod => prod.id === idProducto);
    const proveedor = providersMock.find(prov => prov.id === producto.idProveedor);
    return proveedor;
}
function getNombreProveedor(idProveedor) {
    const proveedor = providersMock.find(prov => prov.id === idProveedor);
    const nombreProv = proveedor.nombre;
    const apellidoProv = proveedor.apellido;
    const concat = `${nombreProv} ${apellidoProv}`; //nombreProv + " " + apellidoProv //nombreProv.concat(' ', apellidoProv)
    const toMayusc = concat.toUpperCase();
    // recorrer el array de proveedores. 
    // Encontrar el proveedor de acuerdo al id que llega por parametro
    // Obtener su nombre
    // Obtener su apellido
    // Concatenar nombre y apellido y pasarlo todo a mayusculas
    // retornar el nombre completo transformado a mayusculas
    return toMayusc;
}
//  console.log(getNombreProveedor('P0005'));
//  console.log( getProveedorPorProducto( 'P0001' ) )
