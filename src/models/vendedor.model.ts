import { Empleado } from "./empleado.model.js"


export class Vendedor extends Empleado{
  constructor( _nombre: string, _apellido: string, _dni: string, _id: string ) {
      super(_nombre, _apellido, _dni, _id)
      
  }
  saludar(nombre:string){
      console.log("Buenos dias, "+nombre+".  Espero que haya tenido uuna gran semana de ventas");
  }
}
