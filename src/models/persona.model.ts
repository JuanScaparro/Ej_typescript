import IPersona from "../interfaces/ipersona.interface.js";


export class Persona implements IPersona{
  nombre: string;
  apellido: string;
  dni: string;

  constructor( _nombre: string, _apellido: string, _dni: string ){
      this.nombre = _nombre
      this.apellido = _apellido
      this.dni = _dni
  }

  public hablar():void{}

}