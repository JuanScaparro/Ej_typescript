import { Empleado } from "./empleado.model.js"


export class Administrativo extends Empleado{
  constructor( _nombre: string, _apellido: string, _dni: string, _id: string ) {
      super(_nombre, _apellido, _dni, _id)
      
  }
  facturar(mes:string){
      console.log("Estoy facturando el mes de "+mes)
  }
  saludar(nombre:string){
      console.log("Hey, buenos dias, "+nombre+".  Vamos que hoy hoy es viernes, perro!!")
  }

}