import { Empleado } from "./empleado.model.js";
export class Administrativo extends Empleado {
    constructor(_nombre, _apellido, _dni, _id) {
        super(_nombre, _apellido, _dni, _id);
    }
    facturar(mes) {
        console.log("Estoy facturando el mes de " + mes);
    }
    saludar(nombre) {
        console.log("Hey, buenos dias, " + nombre + ".  Vamos que hoy hoy es viernes, perro!!");
    }
}
