import { Vendedor } from '../models/vendedor.model.js';
import { prefixObj, sellersMock, totalDigits } from '../utils/data.js';
import { getFormData, handleLS, nextId, printId } from '../utils/utils.js';
let sellers = [];
const tbodyVend = document.getElementById('tbodyVend');
const btnFormSeller = document.getElementById('btnFormSeller');
btnFormSeller.addEventListener('click', sendForm);
const idSeller = document.getElementById('idSeller');
const printIdPayload = {
    idForm: idSeller,
    list: sellers,
    prefix: prefixObj.seller,
    totalDigits: totalDigits
};
function printSaller() {
    sellers.forEach(item => { buildTableItem(item); });
}
;
function buildTableItem(item) {
    const tr = document.createElement('tr');
    const thIdSeller = document.createElement('th');
    thIdSeller.setAttribute('scope', 'row');
    const thIdSellerText = document.createTextNode(item.id);
    thIdSeller.appendChild(thIdSellerText);
    const tdNomSaller = document.createElement('td');
    const tdNomSallerText = document.createTextNode(item.nombre);
    tdNomSaller.appendChild(tdNomSallerText);
    const tdApeSaller = document.createElement('td');
    const tdApeSallerText = document.createTextNode(item.apellido);
    tdApeSaller.appendChild(tdApeSallerText);
    const tdDniSaller = document.createElement('td');
    const tdDniSallerText = document.createTextNode(item.dni);
    tdDniSaller.appendChild(tdDniSallerText);
    tr.appendChild(thIdSeller);
    tr.appendChild(tdNomSaller);
    tr.appendChild(tdApeSaller);
    tr.appendChild(tdDniSaller);
    tbodyVend.appendChild(tr);
}
;
function sendForm(event) {
    const sendForm = getFormData(event);
    addSeller(sendForm);
    printId(printIdPayload);
}
;
function addSeller(formData) {
    const { error, data } = formData;
    if (error)
        return;
    const newSeller = new Vendedor(nextId(sellers, prefixObj.seller, totalDigits), data.nameSeller, data.apeSeller, data.dniSeller);
    sellers.push(newSeller);
    localStorage.setItem('sellers', JSON.stringify(sellers));
    buildTableItem(newSeller);
}
;
function init() {
    sellers = handleLS('sellers', [...sellersMock]);
    printIdPayload.list = sellers;
    printId(printIdPayload);
    printSaller();
}
init();
