import { Producto } from "../models/producto.model.js";
import { productsMock, prefixObj, totalDigits } from '../utils/data.js';
import { getFormData, buildSelectOptions, nextId, handleLS, printId } from '../utils/utils.js';
import { getDiscount } from '../utils/utils.js';
import { getDiscountPercent } from '../utils/utils.js';
let products = [];
const tbodyProd = document.getElementById("tbodyProd");
const btnSubmitForm = document.getElementById("btnFormProd");
btnSubmitForm.addEventListener('click', sendForm);
const optionProductSelect = document.getElementById('c_idProv');
const idProd = document.getElementById('c_id');
const printIdPayload = {
    idForm: idProd,
    list: products,
    prefix: prefixObj.product,
    totalDigits: totalDigits
};
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
    printId(printIdPayload);
}
function addProduct(formData) {
    const { error, data } = formData;
    if (error)
        return;
    const newProd = new Producto(nextId(products, prefixObj.product, totalDigits), data.c_desc, Number(data.c_price), data.c_idProv);
    products.push(newProd);
    localStorage.setItem("products", JSON.stringify(products));
    buildTableItem(newProd);
}
// Inicia el flujo del codigo
function init() {
    products = handleLS('products', [...productsMock]);
    printIdPayload.list = products;
    const providerOptions = handleLS('providers');
    buildSelectOptions(providerOptions, optionProductSelect);
    printproducts();
    printId(printIdPayload);
}
init();
