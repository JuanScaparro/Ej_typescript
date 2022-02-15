import { Venta } from "../models/ventas.model.js";
import { prefixObj, saleMock, totalDigits } from "../utils/data.js";
import { getFormData, buildSelectOptions, getNewFullId, getNewIdNumber } from '../utils/utils.js';
import { sellersMock, customersMock } from '../utils/data.js';
let sales = [];
const tbodySales = document.getElementById('tbodySales');
const btnSubmitForm = document.getElementById('btnFormVta');
btnSubmitForm.addEventListener('click', sendForm);
const optionClientsSelect = document.getElementById('clientsId');
const optionSellersSelect = document.getElementById('sellersId');
function printSales() {
    console.log(sales);
    sales.forEach((sale) => { buildTableItem(sale); });
}
;
function buildTableItem(item) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    const thText = document.createTextNode(item.id);
    th.appendChild(thText);
    const tdTotSale = document.createElement('td');
    const tdTotSaleText = document.createTextNode(item.importe);
    tdTotSale.appendChild(tdTotSaleText);
    const tdCliName = document.createElement('td');
    const tdCliNameText = document.createTextNode(item.idCliente);
    tdCliName.appendChild(tdCliNameText);
    const tdName = document.createElement('td');
    const tdNameText = document.createTextNode(item.idVendedor);
    tdName.appendChild(tdNameText);
    tr.appendChild(th);
    tr.appendChild(tdTotSale);
    tr.appendChild(tdCliName);
    tr.appendChild(tdName);
    tbodySales.appendChild(tr);
}
;
function sendForm(event) {
    const formData = getFormData(event);
    addSale(formData);
}
;
function addSale(formData) {
    const prevId = sales[sales.length - 1].id;
    const newIdNumber = getNewIdNumber(prevId, prefixObj.sale);
    const newFullId = getNewFullId(newIdNumber, prefixObj.sale, totalDigits);
    const newSale = new Venta(newFullId, formData.totalVta, formData.clientsId, formData.sellersId);
    if (newSale.id === '' || newSale.importe === 0 || newSale.idCliente === '' || newSale.idVendedor === '') {
        alert('Complete todos los campos de la venta');
    }
    else {
        sales.push(newSale);
        localStorage.setItem('sales', JSON.stringify(sales));
        buildTableItem(newSale);
    }
}
;
function init() {
    sales = [...saleMock];
    const salesLS = localStorage.getItem('sales');
    if (salesLS) {
        sales = JSON.parse(salesLS);
    }
    else {
        localStorage.setItem('sales', JSON.stringify(sales));
    }
    buildSelectOptions(customersMock, optionClientsSelect);
    buildSelectOptions(sellersMock, optionSellersSelect);
    printSales();
}
init();
