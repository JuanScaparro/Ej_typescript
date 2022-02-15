import { Cliente } from "../models/cliente.model.js";
import { customersMock, prefixObj, totalDigits } from '../utils/data.js';
import { getFormData, getNewFullId, getNewIdNumber } from '../utils/utils.js';

let customers: Cliente[] = [];
const tbodyCli = document.getElementById( 'tbodyCli' ) as HTMLElement;
const btnFormCli = document.getElementById( 'btnFormCli' ) as HTMLElement;
btnFormCli.addEventListener( 'click', sendForm );


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
  addClient( formData );
};

function addClient( formData: any ) {

  const prevId = customers[ customers.length - 1 ].id;
  const newIdNumber = getNewIdNumber( prevId , prefixObj.customer );
  const newFullId = getNewFullId( newIdNumber, prefixObj.customer, totalDigits );

  const newCustomer = new Cliente( newFullId, formData.nameCli, formData.apeCli, formData.dniCli );
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
}
init();