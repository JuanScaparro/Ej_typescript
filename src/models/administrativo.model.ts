import { Empleado } from "./empleado.model.js"


export class Administrativo extends Empleado{
  constructor(  _id: string, _nombre: string, _apellido: string, _dni: string ) {
      super( _id, _nombre, _apellido, _dni)
      
  }
  facturar(mes:string){
      console.log("Estoy facturando el mes de "+mes)
  }
  saludar(nombre:string){
      console.log("Hey, buenos dias, "+nombre+".  Vamos que hoy hoy es viernes, perro!!")
  }

}