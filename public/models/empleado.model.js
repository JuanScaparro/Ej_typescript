import { Persona } from "./persona.model.js";
export class Empleado extends Persona {
    constructor(_nombre, _apellido, _dni, _id) {
        super(_nombre, _apellido, _dni);
        this.id = _id;
    }
    saludar(nombre) {
    }
}
