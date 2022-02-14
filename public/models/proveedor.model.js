import { Persona } from "./persona.model.js";
export class Proveedor extends Persona {
    constructor(_id, _nombre, _apellido, _dni) {
        super(_nombre, _apellido, _dni);
        this.id = _id;
    }
}
