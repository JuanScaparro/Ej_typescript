import { Administrativo } from '../models/administrativo.model.js';
import { administrativesMock, prefixObj, totalDigits } from '../utils/data.js';
import { deleteItem, getFormData, handleLS, nextId, printId, updateItem } from '../utils/utils.js';
let administratives = [];
const lsKey = 'administratives';
const tbody = document.getElementById("tbodyAdm");
const btnFormAdm = document.getElementById('btnFormAdm');
btnFormAdm.addEventListener('click', sendForm);
const idAdm = document.getElementById('idAdm');
const btnUpdateSubmit = document.getElementById('btnUpdateModalSubmit');
btnUpdateSubmit.addEventListener('click', updateSubmit);
const printIdPayload = {
    idForm: idAdm,
    list: administratives,
    prefix: prefixObj.administrative,
    totalDigits: totalDigits
};
function printAdministratives() {
    administratives.forEach(item => { buildTableItem(item); });
}
;
function buildTableItem(item) {
    //
    const tr = document.createElement('tr');
    tr.setAttribute("id", item.id);
    const tdId = document.createElement('td');
    tdId.setAttribute('scope', 'row');
    const tdIdText = document.createTextNode(item.id);
    tdId.appendChild(tdIdText);
    const tdNomAdm = document.createElement('td');
    tdNomAdm.setAttribute('id', 'tdName');
    const tdNomAdmText = document.createTextNode(item.nombre);
    tdNomAdm.appendChild(tdNomAdmText);
    const tdApeAdm = document.createElement('td');
    tdApeAdm.setAttribute('id', 'tdApe');
    const tdApeAdmText = document.createTextNode(item.apellido);
    tdApeAdm.appendChild(tdApeAdmText);
    const tdDniAdm = document.createElement('td');
    tdDniAdm.setAttribute('id', 'tdDni');
    const tdDniAdmText = document.createTextNode(item.dni);
    tdDniAdm.appendChild(tdDniAdmText);
    // Boton Elminar
    const tdDel = document.createElement('td');
    const tdBtnDel = document.createElement('button');
    tdBtnDel.setAttribute('class', 'btn btn-danger btn-sm');
    tdBtnDel.setAttribute('id', 'btnDel');
    tdBtnDel.addEventListener('click', (e) => { deleteItem(e, lsKey, tbody, init); });
    tdDel.appendChild(tdBtnDel);
    const tdBtnDelText = document.createTextNode('Eliminar');
    tdBtnDel.appendChild(tdBtnDelText);
    // Boton Modificar
    const tdMod = document.createElement('td');
    const tdBtnMod = document.createElement('button');
    tdBtnMod.setAttribute('class', 'btn btn-warning btn-sm');
    tdBtnMod.setAttribute('id', 'btnMod');
    tdBtnMod.setAttribute('data-bs-toggle', 'modal'); // lanza el modal
    tdBtnMod.setAttribute('data-bs-target', '#updateModal'); // Identifica el modal a lanzar
    const rowIdElement = document.getElementById('idAdmUpdate');
    const inputs = [
        {
            form: "tdName",
            modal: "nameAdmUpdate"
        },
        {
            form: "tdApe",
            modal: "apeAdmUpdate"
        },
        {
            form: "tdDni",
            modal: "dniAdmUpdate"
        }
    ];
    tdBtnMod.addEventListener('click', (e) => { updateItem(e, rowIdElement, inputs); });
    tdMod.appendChild(tdBtnMod);
    const tdBtnModText = document.createTextNode('Modificar');
    tdBtnMod.appendChild(tdBtnModText);
    tr.appendChild(tdId);
    tr.appendChild(tdNomAdm);
    tr.appendChild(tdApeAdm);
    tr.appendChild(tdDniAdm);
    tr.appendChild(tdDel);
    tr.appendChild(tdMod);
    tbody.appendChild(tr);
}
function sendForm(event) {
    const formData = getFormData(event);
    addAdmin(formData);
    printId(printIdPayload);
}
;
function addAdmin(formData) {
    const { error, data } = formData;
    if (error)
        return;
    const newAdministrative = new Administrativo(nextId(administratives, prefixObj.administrative, totalDigits), data.nameAdm, data.apeAdm, data.dniAdm);
    administratives.push(newAdministrative);
    localStorage.setItem(lsKey, JSON.stringify(administratives));
    buildTableItem(newAdministrative);
}
;
const inputsModifyModal = {
    name: document.getElementById('nameAdmUpdate'),
    ape: document.getElementById('apeAdmUpdate'),
    dni: document.getElementById('dniAdmUpdate')
};
function updateSubmit() {
    const idModal = document.getElementById('idAdmUpdate').textContent;
    administratives.forEach(item => {
        if (item.id === idModal) {
            item.nombre = inputsModifyModal.name.value;
            item.apellido = inputsModifyModal.ape.value;
            item.dni = inputsModifyModal.dni.value;
        }
    });
    localStorage.setItem('administratives', JSON.stringify(administratives));
    tbody.innerHTML = '';
    init();
}
;
function init() {
    administratives = handleLS(lsKey, [...administrativesMock]);
    printIdPayload.list = administratives;
    printAdministratives();
    printId(printIdPayload);
}
init();
