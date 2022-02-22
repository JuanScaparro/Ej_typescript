import { Producto } from "../models/producto.model.js";
export function getFormData(event) {
    event.preventDefault();
    const formRefId = event.target.parentElement.id;
    const formRef = document.getElementById(formRefId);
    let isError = false;
    const inputs = formRef.querySelectorAll("input");
    const selects = formRef.querySelectorAll("select");
    let result = {
        error: isError,
        data: {}
    };
    inputs.forEach((input) => {
        input.value === "" && (isError = true);
        result.data = Object.assign(Object.assign({}, result.data), { [input.id]: input.value });
    });
    selects.forEach((select) => {
        select.options[select.selectedIndex].value === "" && (isError = true);
        result.data = Object.assign(Object.assign({}, result.data), { [select.id]: select.options[select.selectedIndex].value });
    });
    if (isError) {
        showError();
        result.error = isError;
    }
    else {
        formRef.reset();
    }
    return result;
}
function showError() {
    alert('Complete todos los campos de la venta');
}
;
export function getDiscount(item) {
    const price = item;
    const discount = price * 0.10;
    const resultDisc = price - discount;
    return Number(resultDisc.toFixed(2));
}
;
export function getDiscountPercent(item) {
    const price = item;
    const discount = price - getDiscount(item); //price *0.10
    return Number(discount.toFixed(2));
}
;
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
;
export function getNewIdNumber(prevId, prefix) {
    const idToEval = parseInt(prevId.slice(prefix.length));
    const newId = (idToEval + 1).toString();
    return newId;
}
;
export function nextId(listType, prefixType, totalDigits) {
    const prevId = listType[listType.length - 1].id;
    const newIdNumber = getNewIdNumber(prevId, prefixType);
    const newFullId = getNewFullId(newIdNumber, prefixType, totalDigits);
    return newFullId;
}
;
export function handleLS(key, dataMock) {
    let returnData = dataMock || [];
    const resultData = localStorage.getItem(key);
    if (resultData) {
        returnData = JSON.parse(resultData);
    }
    else {
        localStorage.setItem(key, JSON.stringify(returnData));
    }
    return returnData;
}
;
export function printId(payload) {
    const { idForm, list, prefix, totalDigits } = payload;
    const isH2 = idForm.hasChildNodes();
    if (isH2) {
        idForm.getElementsByTagName('h2')[0].innerHTML = nextId(list, prefix, totalDigits);
    }
    else {
        const nodoH2 = document.createElement('h2');
        const h2Text = document.createTextNode(nextId(list, prefix, totalDigits));
        nodoH2.appendChild(h2Text);
        idForm.appendChild(nodoH2);
    }
}
;
export function deleteItem(event, key, tbody, callback) {
    event.preventDefault();
    const itemId = event.target.parentElement.parentElement.id;
    deleteLS(key, itemId, tbody, callback);
}
;
function deleteLS(key, id, tbody, callback) {
    let dataLS = JSON.parse(localStorage.getItem(key));
    const dataLSFiltered = dataLS.filter(item => item.id !== id);
    let newDataLS = JSON.stringify(dataLSFiltered);
    localStorage.setItem(key, newDataLS);
    resetTable(tbody, callback);
}
function resetTable(tbody, callback) {
    tbody.innerHTML = "";
    callback();
}
