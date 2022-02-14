import { Producto } from "../models/producto.model.js";
export function getFormData(event) {
    event.preventDefault();
    const formRefId = event.target.parentElement.id;
    const formRef = document.getElementById(formRefId);
    const inputs = formRef.querySelectorAll("input");
    const selects = formRef.querySelectorAll("select");
    let result = {};
    inputs.forEach((input) => {
        result = Object.assign(Object.assign({}, result), { [input.id]: input.value });
    });
    selects.forEach((select) => {
        result = Object.assign(Object.assign({}, result), { [select.id]: select.options[select.selectedIndex].value });
    });
    formRef.reset();
    return result;
}
export function getDiscount(item) {
    const price = item;
    const discount = price * 0.10;
    const resultDisc = price - discount;
    return Number(resultDisc.toFixed(2));
}
export function getDiscountPercent(item) {
    const price = item;
    const discount = price - getDiscount(item); //price *0.10
    return Number(discount.toFixed(2));
}
export function buildSelectOptions(list, selectRef) {
    list.forEach(item => {
        const opt = document.createElement('option');
        opt.setAttribute('value', item.id);
        let optText;
        if (item instanceof Producto) {
            optText = document.createTextNode(`${item.descripcion}`);
        }
        else {
            optText = document.createTextNode(`${item.nombre} ${item.apellido}`);
        }
        opt.appendChild(optText);
        selectRef.appendChild(opt);
    });
}
;
export function getNewFullId(id, prefix, totalDigits) {
    return id.length >= totalDigits
        ? prefix + id
        : prefix + new Array(totalDigits - id.length + 1).join('0') + id;
}
export function getNewIdNumber(prevId, prefix) {
    const idToEval = parseInt(prevId.slice(prefix.length));
    const newId = (idToEval + 1).toString();
    return newId;
}
