import { Cliente } from "../models/cliente.model.js";
import { customersMock, prefixObj, totalDigits } from '../utils/data.js';
import { getFormData, getNewFullId, getNewIdNumber } from '../utils/utils.js';

let customers: Cliente[] = [];
const tbodyCli = document.getElementById( 'tbodyCli' ) as HTMLElement;
const btnFormCli = document.getElementById( 'btnFormCli' ) as HTMLElement;
btnFormCli.addEventListener( 'click', sendForm );
const idCli = document.getElementById( 'idCli' ) as HTMLFormElement;


function printCustomers(): void {

  customers.forEach( item => { buildTableItem( item ) });

};


// GENERA DINAMICAMENTE LA TABLA DE CLIENTES

function buildTableItem( item: any ){

    const tr = document.createElement( 'tr' );

    const thId = document.createElement( 'th' );
    thId.setAttribute( 'scope', 'row' );
    const thIdText = document.createTextNode( item.id );
    thId.appendChild( thIdText );

    const tdNomCli = document.createElement( 'td' );
    const tdNomCliText = document.createTextNode( item.nombre );
    tdNomCli.appendChild( tdNomCliText );

    const tdApeCli = document.createElement( 'td' );
    const tdApeCliText = document.createTextNode( item.apellido );
    tdApeCli.appendChild( tdApeCliText );

    const tdDniCli = document.createElement( 'td' );
    const tdDniCliText = document.createTextNode( item.dni );
    tdDniCli.appendChild( tdDniCliText );

    tr.appendChild( thId );
    tr.appendChild( tdNomCli );
    tr.appendChild( tdApeCli );
    tr.appendChild( tdDniCli );

    tbodyCli.appendChild( tr );
}


function sendForm( event: any ) {
  const formData = getFormData( event );
  addCustomer( formData );
  printId()
};

function nextId(): string {
  
  const prevId = customers[ customers.length - 1 ].id;
  const newIdNumber = getNewIdNumber( prevId , prefixObj.customer );
  const newFullId = getNewFullId( newIdNumber, prefixObj.customer, totalDigits );

  return newFullId;

};

function printId() {
  const isH2: boolean = idCli.hasChildNodes();

  if( isH2 ) {
    idCli.getElementsByTagName( 'h2' )[0].innerHTML = nextId();
  }else {
    const nodoH2 = document.createElement( 'h2' );
    const h2Text = document.createTextNode( nextId() );
    nodoH2.appendChild( h2Text );
    idCli.appendChild( nodoH2 );
  }
}

function addCustomer( formData: any ) {

  const newCustomer = new Cliente( nextId(), formData.nameCli, formData.apeCli, formData.dniCli );
  if( newCustomer.id === '' || newCustomer.nombre === '' || newCustomer.apellido === '' || newCustomer.dni === '' ){
    alert( 'Complete todos los campos del nuevo cliente' );
  }else{
    customers.push( newCustomer );
    localStorage.setItem( 'customers', JSON.stringify( customers ) );
    buildTableItem( newCustomer );
  };
};

function init() {
  customers = [ ...customersMock ];
  const customersLS = localStorage.getItem( 'customers' );

  if( customersLS ){
    customers = JSON.parse( customersLS );
  }else{
    localStorage.setItem( 'customers', JSON.stringify( customers ) );
  }
  printCustomers();
  printId();
}
init();