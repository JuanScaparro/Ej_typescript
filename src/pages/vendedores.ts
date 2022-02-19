import { Vendedor } from '../models/vendedor.model.js';
import { prefixObj, sellersMock, totalDigits } from '../utils/data.js';
import { getFormData, nextId } from '../utils/utils.js';



let sellers: Vendedor[] = [];
const tbodyVend = document.getElementById( 'tbodyVend' ) as HTMLElement;
const btnFormSeller = document.getElementById( 'btnFormSeller' ) as HTMLButtonElement;
btnFormSeller.addEventListener( 'click', sendForm );
const idSeller = document.getElementById( 'idSeller' ) as HTMLFormElement

function printSaller(): void {

  sellers.forEach( item => { buildTableItem( item ) });

};

function buildTableItem( item: any ) {
  const tr = document.createElement( 'tr' );

  const thIdSeller = document.createElement( 'th' );
  thIdSeller.setAttribute( 'scope', 'row' );
  const thIdSellerText = document.createTextNode( item.id );
  thIdSeller.appendChild( thIdSellerText );

  const tdNomSaller = document.createElement( 'td' );
  const tdNomSallerText = document.createTextNode( item.nombre );
  tdNomSaller.appendChild( tdNomSallerText );

  const tdApeSaller = document.createElement( 'td' );
  const tdApeSallerText = document.createTextNode( item.apellido );
  tdApeSaller.appendChild( tdApeSallerText );

  const tdDniSaller = document.createElement( 'td' );
  const tdDniSallerText = document.createTextNode( item.dni );
  tdDniSaller.appendChild( tdDniSallerText );

  tr.appendChild( thIdSeller );
  tr.appendChild( tdNomSaller );
  tr.appendChild( tdApeSaller );
  tr.appendChild( tdDniSaller );

  tbodyVend.appendChild( tr );
};

function sendForm( event: any ) {
  const sendForm = getFormData( event );
  addSeller( sendForm );
  printId()
};

function printId() {

  const isH2: boolean = idSeller!.hasChildNodes();
  
  if( isH2 ){
    idSeller.getElementsByTagName( 'h2' )[0].innerHTML = nextId(sellers, prefixObj.seller, totalDigits)
  }else{
    const nodoH2 = document.createElement( 'h2' )
    const h2Text = document.createTextNode( nextId(sellers, prefixObj.seller, totalDigits) );
    nodoH2.appendChild( h2Text );
    idSeller.appendChild( nodoH2 );
  }

};

function addSeller( formData: any ) {
  
  const newSeller = new Vendedor( nextId(sellers, prefixObj.seller, totalDigits), formData.nameSeller, formData.apeSeller, formData.dniSeller );
  if( newSeller.id === '' || newSeller.nombre === '' || newSeller.apellido === '' || newSeller.dni === '' ) {
    alert( 'Complete todos los campos del nuevo Vendedor' );
  } else {
    sellers.push( newSeller );
    localStorage.setItem( 'sellers', JSON.stringify( sellers ) );
    buildTableItem( newSeller );
  }

};

function init() {
  sellers = [ ...sellersMock ];
  const sellersLS = localStorage.getItem( 'sellers' );

  if( sellersLS ){
    sellers = JSON.parse( sellersLS );
  }else{
    localStorage.setItem( 'sellers', JSON.stringify( sellers ) );
  }
  printId()
  printSaller();
}
init();