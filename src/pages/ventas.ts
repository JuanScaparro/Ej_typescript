import { Venta } from "../models/ventas.model.js";
import { prefixObj, saleMock, totalDigits } from "../utils/data.js";
import { getFormData, buildSelectOptions, nextId } from '../utils/utils.js';
import { sellersMock, customersMock } from '../utils/data.js';



let sales: Venta[] = [];
const tbodySales = document.getElementById( 'tbodySales' ) as HTMLTableElement;
const btnSubmitForm = document.getElementById( 'btnFormVta' ) as HTMLButtonElement;
btnSubmitForm.addEventListener( 'click', sendForm );
const optionClientsSelect = document.getElementById( 'clientsId' ) as HTMLSelectElement;
const optionSellersSelect = document.getElementById( 'sellersId' ) as HTMLSelectElement;
const idVta = document.getElementById( 'idVta' ) as HTMLFormElement;



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
  printId();
};

function printId() {
  const isH2: boolean = idVta.hasChildNodes();

  if( isH2 ) {
    idVta.getElementsByTagName( 'h2' )[0].innerHTML = nextId(sales, prefixObj.sale, totalDigits);
  }else {
    const nodoH2 = document.createElement( 'h2' );
    const h2Text = document.createTextNode( nextId(sales, prefixObj.sale, totalDigits) );
    nodoH2.appendChild( h2Text );
    idVta.appendChild( nodoH2 );
  }
};

function addSale( formData: any ){

  const newSale = new Venta( nextId(sales, prefixObj.sale, totalDigits), formData.totalVta, formData.clientsId, formData.sellersId );
  if( newSale.id === '' || newSale.importe === 0 || newSale.idCliente === '' || newSale.idVendedor === '' ){
    alert( 'Complete todos los campos de la venta' );
  }else{
    sales.push( newSale );
    localStorage.setItem( 'sales', JSON.stringify( sales ));
    buildTableItem( newSale );
  }
};


function init(){

  sales = [ ...saleMock ];
  const salesLS = localStorage.getItem( 'sales' );

  if( salesLS ){
    sales = JSON.parse( salesLS );
  }else{
    localStorage.setItem( 'sales', JSON.stringify( sales ) );
  }
  buildSelectOptions( customersMock, optionClientsSelect );
  buildSelectOptions( sellersMock, optionSellersSelect );
  printSales();
  printId();
};
init();