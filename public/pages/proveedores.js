import { Proveedor } from "../models/proveedor.model.js";
import { providersMock, prefixObj, totalDigits } from '../utils/data.js';
import { getFormData, handleLS, nextId, printId } from '../utils/utils.js';
let providers = [];
const tbodyProv = document.getElementById('tbodyProv');
const btmFormProv = document.getElementById('btnFormProv');
btmFormProv.addEventListener('click', sendForm);
const idProv = document.getElementById('idProv');
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
    const thIdProv = document.createElement('th');
    thIdProv.setAttribute('scope', 'row');
    const thIdProvText = document.createTextNode(item.id);
    thIdProv.appendChild(thIdProvText);
    const tdNomProv = document.createElement('td');
    const tdNomProvText = document.createTextNode(item.nombre);
    tdNomProv.appendChild(tdNomProvText);
    const tdApeProv = document.createElement('td');
    const tdApeProvText = document.createTextNode(item.apellido);
    tdApeProv.appendChild(tdApeProvText);
    const tdDniProv = document.createElement('td');
    const tdDniProvText = document.createTextNode(item.dni);
    tdDniProv.appendChild(tdDniProvText);
    tr.appendChild(thIdProv);
    tr.appendChild(tdNomProv);
    tr.appendChild(tdApeProv);
    tr.appendChild(tdDniProv);
    tbodyProv.appendChild(tr);
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
    localStorage.setItem('providers', JSON.stringify(providers));
    builtTableItem(newProvider);
}
;
function init() {
    providers = handleLS('providers', [...providersMock]);
    printIdPayload.list = providers;
    printProvider();
    printId(printIdPayload);
}
init();
