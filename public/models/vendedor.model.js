import { Empleado } from "./empleado.model.js";
export class Vendedor extends Empleado {
    constructor(_nombre, _apellido, _dni, _id) {
        super(_nombre, _apellido, _dni, _id);
    }
    saludar(nombre) {
        console.log("Buenos dias, " + nombre + ".  Espero que haya tenido uuna gran semana de ventas");
    }
}
