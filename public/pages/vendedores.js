import { Vendedor } from '../models/vendedor.model.js';
import { prefixObj, sellersMock, totalDigits } from '../utils/data.js';
import { deleteItem, getFormData, handleLS, nextId, printId, updateItem } from '../utils/utils.js';
let sellers = [];
const lsKey = 'sellers';
const tbody = document.getElementById('tbodyVend');
const btnFormSeller = document.getElementById('btnFormSeller');
btnFormSeller.addEventListener('click', sendForm);
const idSeller = document.getElementById('idSeller');
const btnUpdateSubmit = document.getElementById('btnUpdateModalSubmit');
btnUpdateSubmit.addEventListener('click', updateSubmit);
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
    tdNomSaller.setAttribute('id', 'tdName');
    tdNomSaller.appendChild(tdNomSallerText);
    const tdApeSaller = document.createElement('td');
    tdApeSaller.setAttribute('id', 'tdApe');
    const tdApeSallerText = document.createTextNode(item.apellido);
    tdApeSaller.appendChild(tdApeSallerText);
    const tdDniSaller = document.createElement('td');
    tdDniSaller.setAttribute('id', 'tdDni');
    const tdDniSallerText = document.createTextNode(item.dni);
    tdDniSaller.appendChild(tdDniSallerText);
    const tdDel = document.createElement('td');
    const tdBtnDel = document.createElement('button');
    tdBtnDel.setAttribute('class', 'btn btn-danger btn-sm');
    tdBtnDel.setAttribute('id', 'btnDel');
    tdBtnDel.addEventListener('click', (e) => { deleteItem(e, lsKey, tbody, init); });
    tdDel.appendChild(tdBtnDel);
    const tdBtnDelText = document.createTextNode('Eliminar');
    tdBtnDel.appendChild(tdBtnDelText);
    const tdMod = document.createElement('td');
    const tdBtnMod = document.createElement('button');
    tdBtnMod.setAttribute('class', 'btn btn-warning btn-sm');
    tdBtnMod.setAttribute('id', 'btnMod');
    tdBtnMod.setAttribute('data-bs-toggle', 'modal');
    tdBtnMod.setAttribute('data-bs-target', '#updateModal');
    const rowIdElement = document.getElementById('idUpdate');
    const inputs = [
        {
            form: "tdName",
            modal: "nameUpdate"
        },
        {
            form: "tdApe",
            modal: "apeUpdate"
        },
        {
            form: "tdDni",
            modal: "dniUpdate"
        }
    ];
    tdBtnMod.addEventListener('click', (e) => { updateItem(e, rowIdElement, inputs); });
    tdMod.appendChild(tdBtnMod);
    const tdBtnModText = document.createTextNode('Modificar');
    tdBtnMod.appendChild(tdBtnModText);
    tr.appendChild(thIdSeller);
    tr.appendChild(tdNomSaller);
    tr.appendChild(tdApeSaller);
    tr.appendChild(tdDniSaller);
    tr.appendChild(tdDel);
    tr.appendChild(tdMod);
    tbody.appendChild(tr);
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
    localStorage.setItem(lsKey, JSON.stringify(sellers));
    buildTableItem(newSeller);
}
;
const inputsModifyModal = {
    name: document.getElementById('nameUpdate'),
    ape: document.getElementById('apeUpdate'),
    dni: document.getElementById('dniUpdate')
};
function updateSubmit() {
    const idModal = document.getElementById('idUpdate').textContent;
    sellers.forEach(item => {
        if (item.id === idModal) {
            item.nombre = inputsModifyModal.name.value;
            item.apellido = inputsModifyModal.ape.value;
            item.dni = inputsModifyModal.dni.value;
        }
    });
    localStorage.setItem('sellers', JSON.stringify(sellers));
    tbody.innerHTML = '';
    init();
}
;
function init() {
    sellers = handleLS('sellers', [...sellersMock]);
    printIdPayload.list = sellers;
    printId(printIdPayload);
    printSaller();
}
init();
