import { Venta } from "../models/ventas.model.js";
import { prefixObj, salesMock, totalDigits } from "../utils/data.js";
import { getFormData, buildSelectOptions, nextId, handleLS, printId } from '../utils/utils.js';




let sales: Venta[] = [];
const tbodySales = document.getElementById( 'tbodySales' ) as HTMLTableElement;
const btnSubmitForm = document.getElementById( 'btnFormVta' ) as HTMLButtonElement;
btnSubmitForm.addEventListener( 'click', sendForm );
const optionClientsSelect = document.getElementById( 'clientsId' ) as HTMLSelectElement;
const optionSellersSelect = document.getElementById( 'sellersId' ) as HTMLSelectElement;
const idVta = document.getElementById( 'idVta' ) as HTMLFormElement;
const printIdPayload = {
  idForm: idVta,
  list: sales,
  prefix: prefixObj.sale,
  totalDigits: totalDigits
}



function printSales(): void {

  sales.forEach( ( sale ) => { buildTableItem( sale ) } );

};

function buildTableItem( item:any ){
  const tr = document.createElement( 'tr' );

  const th = document.createElement( 'th' );
  th.setAttribute( 'scope', 'row' );
  const thText = document.createTextNode( item.id );
  th.appendChild( thText );

  const tdTotSale = document.createElement( 'td' );
  const tdTotSaleText = document.createTextNode( item.importe );
  tdTotSale.appendChild( tdTotSaleText );

  const tdCliName = document.createElement( 'td' );
  const tdCliNameText = document.createTextNode( item.idCliente );
  tdCliName.appendChild( tdCliNameText );

  const tdName = document.createElement( 'td' );
  const tdNameText = document.createTextNode( item.idVendedor );
  tdName.appendChild( tdNameText );

  tr.appendChild( th );
  tr.appendChild( tdTotSale );
  tr.appendChild( tdCliName );
  tr.appendChild( tdName );

  tbodySales.appendChild( tr );
};

function sendForm( event: any )  {
  const formData = getFormData( event );
  addSale( formData );
  printId(printIdPayload);
};

function addSale( formData: any ){

  const {error, data} = formData
  if(error) return

  const newSale = new Venta( nextId(sales, prefixObj.sale, totalDigits), data.totalVta, data.clientsId, data.sellersId );

  sales.push( newSale );
  localStorage.setItem( 'sales', JSON.stringify( sales ));
  buildTableItem( newSale );
 
};


function init(){

  sales = handleLS("sales", [...salesMock])
  printIdPayload.list = sales
  const customerOptions: any[] = handleLS("customers")
  const sellerOptions: any[] = handleLS('sellers')
  buildSelectOptions( customerOptions, optionClientsSelect );
  buildSelectOptions( sellerOptions, optionSellersSelect );
  printSales();
  printId(printIdPayload);
};
init();


