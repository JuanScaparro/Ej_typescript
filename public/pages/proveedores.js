import { Proveedor } from "../models/proveedor.model.js";
import { providersMock, prefixObj, totalDigits } from '../utils/data.js';
import { deleteItem, getFormData, handleLS, nextId, printId, updateItem } from '../utils/utils.js';
let providers = [];
const lsKey = 'providers';
const tbody = document.getElementById('tbodyProv');
const btmFormProv = document.getElementById('btnFormProv');
btmFormProv.addEventListener('click', sendForm);
const idProv = document.getElementById('idProv');
const btnUpdateSubmit = document.getElementById('btnUpdateModalSubmit');
btnUpdateSubmit.addEventListener('click', updateSubmit);
const printIdPayload = {
    idForm: idProv,
    list: providers,
    prefix: prefixObj.dealer,
    totalDigits: totalDigits
};
function printProvider() {
    providers.forEach(item => { builtTableItem(item); });
}
;
function builtTableItem(item) {
    const tr = document.createElement('tr');
    tr.setAttribute("id", item.id);
    const thIdProv = document.createElement('th');
    thIdProv.setAttribute('scope', 'row');
    const thIdProvText = document.createTextNode(item.id);
    thIdProv.appendChild(thIdProvText);
    const tdNomProv = document.createElement('td');
    tdNomProv.setAttribute('id', 'tdName');
    const tdNomProvText = document.createTextNode(item.nombre);
    tdNomProv.appendChild(tdNomProvText);
    const tdApeProv = document.createElement('td');
    tdApeProv.setAttribute('id', 'tdApe');
    const tdApeProvText = document.createTextNode(item.apellido);
    tdApeProv.appendChild(tdApeProvText);
    const tdDniProv = document.createElement('td');
    tdDniProv.setAttribute('id', 'tdDni');
    const tdDniProvText = document.createTextNode(item.dni);
    tdDniProv.appendChild(tdDniProvText);
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
    tr.appendChild(thIdProv);
    tr.appendChild(tdNomProv);
    tr.appendChild(tdApeProv);
    tr.appendChild(tdDniProv);
    tr.appendChild(tdDel);
    tr.appendChild(tdMod);
    tbody.appendChild(tr);
}
function sendForm(event) {
    const formData = getFormData(event);
    addProvider(formData);
    printId(printIdPayload);
}
;
function addProvider(formData) {
    const { error, data } = formData;
    if (error)
        return;
    const newProvider = new Proveedor(nextId(providers, prefixObj.dealer, totalDigits), data.nameProv, data.apeProv, data.dniProv);
    providers.push(newProvider);
    localStorage.setItem(lsKey, JSON.stringify(providers));
    builtTableItem(newProvider);
}
;
const inputsModifyModal = {
    name: document.getElementById('nameUpdate'),
    ape: document.getElementById('apeUpdate'),
    dni: document.getElementById('dniUpdate')
};
function updateSubmit() {
    const idModal = document.getElementById('idUpdate').textContent;
    providers.forEach(item => {
        if (item.id === idModal) {
            item.nombre = inputsModifyModal.name.value;
            item.apellido = inputsModifyModal.ape.value;
            item.dni = inputsModifyModal.dni.value;
        }
    });
    localStorage.setItem(lsKey, JSON.stringify(providers));
    tbody.innerHTML = '';
    init();
}
;
function init() {
    providers = handleLS(lsKey, [...providersMock]);
    printIdPayload.list = providers;
    printProvider();
    printId(printIdPayload);
}
init();
