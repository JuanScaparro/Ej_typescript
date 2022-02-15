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
// IMPRIME DINAMICAMENTE EL HTML 
function printproducts() {
    products.forEach((prod) => {
        buildTableItem(prod);
    });
}
// GENERA LA TABLA
function buildTableItem(item) {
    const fila = document.createElement("tr"); // <tr>
    //
    const th = document.createElement("th"); //<th scope="row" id="id">1</th>
    th.setAttribute("scope", "row");
    const thText = document.createTextNode(item.id);
    th.appendChild(thText);
    //
    const tdDesc = document.createElement("td"); // <td id="desc">Mark</td>
    const tdDescText = document.createTextNode(item.descripcion);
    tdDesc.appendChild(tdDescText);
    //
    const tdPrecio = document.createElement('td'); // <td id="precio">Otto</td>
    const tdPrecioText = document.createTextNode(item.precio);
    tdPrecio.appendChild(tdPrecioText);
    //
    const tdPrecioDescuento = document.createElement('td'); // <td id="precio">Otto</td>
    const tdPrecioDescuentoText = document.createTextNode(getDiscount(item.precio).toString());
    tdPrecioDescuento.appendChild(tdPrecioDescuentoText);
    //
    const tdDescuento = document.createElement('td'); // <td id="precio">Otto</td>
    const tdDescuentoText = document.createTextNode(getDiscountPercent(item.precio).toString());
    tdDescuento.appendChild(tdDescuentoText);
    //
    const tdName = document.createElement('td'); // <td id="name">@mdo</td>
    const tdNameText = document.createTextNode(item.idProveedor); //getNombreProveedor(prod.idProveedor)
    tdName.appendChild(tdNameText);
    //
    fila.appendChild(th);
    fila.appendChild(tdDesc);
    fila.appendChild(tdPrecio);
    fila.appendChild(tdPrecioDescuento);
    fila.appendChild(tdDescuento);
    fila.appendChild(tdName);
    //
    tbodyProd.appendChild(fila);
}
// Recupera todos los valores de los campos de input de un formulario
function sendForm(event) {
    const formData = getFormData(event);
    addProduct(formData);
}
// genera una nueva instacia de producto
function addProduct(formData) {
    const prevId = products[products.length - 1].id;
    const newIdNumber = getNewIdNumber(prevId, prefixObj.product);
    const newFullId = getNewFullId(newIdNumber, prefixObj.product, totalDigits);
    const newProd = new Producto(newFullId, formData.c_desc, Number(formData.c_price), formData.c_idProv);
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
}
init();
