import { Administrativo } from '../models/administrativo.model.js';
import { administrativeMock, prefixObj, totalDigits } from '../utils/data.js';
import { getFormData, getNewFullId, getNewIdNumber } from '../utils/utils.js';
let administratives = [];
const tbodyAdm = document.getElementById("tbodyAdm");
const btnFormAdm = document.getElementById('btnFormAdm');
btnFormAdm.addEventListener('click', sendForm);
function printAdministratives() {
    administratives.forEach(item => { buildTableItem(item); });
}
;
function buildTableItem(item) {
    const tr = document.createElement('tr');
    const thId = document.createElement('th');
    thId.setAttribute('scope', 'row');
    const thIdText = document.createTextNode(item.id);
    thId.appendChild(thIdText);
    const tdNomAdm = document.createElement('td');
    const tdNomAdmText = document.createTextNode(item.nombre);
    tdNomAdm.appendChild(tdNomAdmText);
    const tdApeAdm = document.createElement('td');
    const tdApeAdmText = document.createTextNode(item.apellido);
    tdApeAdm.appendChild(tdApeAdmText);
    const tdDniAdm = document.createElement('td');
    const tdDniAdmText = document.createTextNode(item.dni);
    tdDniAdm.appendChild(tdDniAdmText);
    tr.appendChild(thId);
    tr.appendChild(tdNomAdm);
    tr.appendChild(tdApeAdm);
    tr.appendChild(tdDniAdm);
    tbodyAdm.appendChild(tr);
}
function sendForm(event) {
    const formData = getFormData(event);
    addAdmin(formData);
}
function addAdmin(formData) {
    const prevId = administratives[administratives.length - 1].id;
    const newIdNumber = getNewIdNumber(prevId, prefixObj.administrative);
    const newFullId = getNewFullId(newIdNumber, prefixObj.administrative, totalDigits);
    const newAdministrative = new Administrativo(newFullId, formData.nameAdm, formData.apeAdm, formData.dniAdm);
    if (newAdministrative.id === '' || newAdministrative.nombre === '' || newAdministrative.apellido === '' || newAdministrative.dni === '') {
        alert('Complete todos los campos del nuevo Administrativo');
    }
    else {
        administratives.push(newAdministrative);
        localStorage.setItem('administratives', JSON.stringify(administratives));
        buildTableItem(newAdministrative);
    }
    ;
}
function init() {
    administratives = [...administrativeMock];
    const administrativesLS = localStorage.getItem('administratives');
    if (administrativesLS) {
        administratives = JSON.parse(administrativesLS);
    }
    else {
        localStorage.setItem('administratives', JSON.stringify(administratives));
    }
    printAdministratives();
}
init();
