import { Empleado } from "./empleado.model.js";
export class Administrativo extends Empleado {
    constructor(_id, _nombre, _apellido, _dni) {
        super(_id, _nombre, _apellido, _dni);
    }
    facturar(mes) {
        console.log("Estoy facturando el mes de " + mes);
    }
    saludar(nombre) {
        console.log("Hey, buenos dias, " + nombre + ".  Vamos que hoy hoy es viernes, perro!!");
    }
}
