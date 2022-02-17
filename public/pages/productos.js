import { Producto } from "../models/producto.model.js";
import { productsMock, providersMock, prefixObj, totalDigits } from '../utils/data.js';
import { getFormData, buildSelectOptions, getNewIdNumber, getNewFullId } from '../utils/utils.js';
import { getDiscount } from '../utils/utils.js';
import { getDiscountPercent } from '../utils/utils.js';
let products = [];
const tbodyProd = document.getElementById("tbodyProd");
const btnSubmitForm = document.getElementById("btnFormProd");
btnSubmitForm.addEventListener('click', sendForm);
const optionProductSelect = document.getElementById('c_idProv');
const idProd = document.getElementById('c_id');
function printproducts() {
    products.forEach((prod) => {
        buildTableItem(prod);
    });
}
function buildTableItem(item) {
    const fila = document.createElement("tr");
    const th = document.createElement("th");
    th.setAttribute("scope", "row");
    const thText = document.createTextNode(item.id);
    th.appendChild(thText);
    const tdDesc = document.createElement("td");
    const tdDescText = document.createTextNode(item.descripcion);
    tdDesc.appendChild(tdDescText);
    const tdPrecio = document.createElement('td');
    const tdPrecioText = document.createTextNode(item.precio);
    tdPrecio.appendChild(tdPrecioText);
    const tdPrecioDescuento = document.createElement('td');
    const tdPrecioDescuentoText = document.createTextNode(getDiscount(item.precio).toString());
    tdPrecioDescuento.appendChild(tdPrecioDescuentoText);
    const tdDescuento = document.createElement('td');
    const tdDescuentoText = document.createTextNode(getDiscountPercent(item.precio).toString());
    tdDescuento.appendChild(tdDescuentoText);
    const tdName = document.createElement('td');
    const tdNameText = document.createTextNode(item.idProveedor);
    tdName.appendChild(tdNameText);
    fila.appendChild(th);
    fila.appendChild(tdDesc);
    fila.appendChild(tdPrecio);
    fila.appendChild(tdPrecioDescuento);
    fila.appendChild(tdDescuento);
    fila.appendChild(tdName);
    tbodyProd.appendChild(fila);
}
function sendForm(event) {
    const formData = getFormData(event);
    addProduct(formData);
    printId();
}
function nextId() {
    const prevId = products[products.length - 1].id;
    const newIdNumber = getNewIdNumber(prevId, prefixObj.product);
    const newFullId = getNewFullId(newIdNumber, prefixObj.product, totalDigits);
    return newFullId;
}
;
function printId() {
    const isH2 = idProd.hasChildNodes();
    if (isH2) {
        idProd.getElementsByTagName('h2')[0].innerHTML = nextId();
    }
    else {
        const nodoH2 = document.createElement('h2');
        const h2Text = document.createTextNode(nextId());
        nodoH2.appendChild(h2Text);
        idProd.appendChild(nodoH2);
    }
}
;
function addProduct(formData) {
    const newProd = new Producto(nextId(), formData.c_desc, Number(formData.c_price), formData.c_idProv);
    if (newProd.id === '' || newProd.descripcion === '' || newProd.precio === 0 || newProd.idProveedor === '') {
        alert('Complete todos los campos');
    }
    else {
        products.push(newProd);
        localStorage.setItem("products", JSON.stringify(products));
        buildTableItem(newProd);
    }
}
// Inicia el flujo del codigo
function init() {
    products = [...productsMock];
    const productsLS = localStorage.getItem("products");
    if (productsLS) {
        products = JSON.parse(productsLS);
    }
    else {
        localStorage.setItem("products", JSON.stringify(products));
    }
    buildSelectOptions(providersMock, optionProductSelect);
    printproducts();
    printId();
}
init();
