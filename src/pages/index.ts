import { Proveedor } from "../models/proveedor.model.js";
import { Producto } from "../models/producto.model.js";
import { providersMock, productsMock } from '../utils/data.js';



// FUNCIONALIDAD

function getProveedorPorProducto( idProducto: string ): Proveedor {

  const producto: Producto = productsMock.find( prod =>  prod.id === idProducto )!
  
  const proveedor: Proveedor = providersMock.find( prov => prov.id === producto.idProveedor)!

  return proveedor
}

function getNombreProveedor( idProveedor: string ): string {

    const proveedor: Proveedor = providersMock.find(prov => prov.id === idProveedor)!
    const nombreProv: string = proveedor.nombre
    const apellidoProv: string = proveedor.apellido
    const concat: string = `${nombreProv} ${apellidoProv}`  //nombreProv + " " + apellidoProv //nombreProv.concat(' ', apellidoProv)
    const toMayusc: string = concat.toUpperCase()
            
    // recorrer el array de proveedores. 
    // Encontrar el proveedor de acuerdo al id que llega por parametro
    // Obtener su nombre
    // Obtener su apellido
    // Concatenar nombre y apellido y pasarlo todo a mayusculas
    // retornar el nombre completo transformado a mayusculas
    return toMayusc
}

//  console.log(getNombreProveedor('P0005'));
//  console.log( getProveedorPorProducto( 'P0001' ) )

