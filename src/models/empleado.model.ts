import { Persona } from "./persona.model.js";


export class Empleado extends Persona{
  id: string;
  
  constructor(  _id: string, _nombre: string, _apellido: string, _dni: string ) {
      super(  _nombre, _apellido, _dni )
      this.id = _id;
  }
  saludar(nombre:string){
  }
}
