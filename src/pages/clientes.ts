import { Cliente } from "../models/cliente.model.js";
import { customersMock, prefixObj, totalDigits } from '../utils/data.js';
import { getFormData, handleLS, nextId, printId } from '../utils/utils.js';

let customers: Cliente[] = [];
const tbodyCli = document.getElementById( 'tbodyCli' ) as HTMLElement;
const btnFormCli = document.getElementById( 'btnFormCli' ) as HTMLElement;
btnFormCli.addEventListener( 'click', sendForm );
const idCli = document.getElementById( 'idCli' ) as HTMLFormElement;
const printIdPayload = {
  idForm: idCli,
  list: customers,
  prefix: prefixObj.customer,
  totalDigits: totalDigits
}


function printCustomers(): void {

  customers.forEach( item => { buildTableItem( item ) });

};

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
  printId(printIdPayload);
};




function addCustomer( formData: any ) {
  const {error, data} = formData
  if(error) return

  const newCustomer = new Cliente( nextId(customers, prefixObj.customer, totalDigits), data.nameCli, data.apeCli, data.dniCli );

  customers.push( newCustomer );
  localStorage.setItem( 'customers', JSON.stringify( customers ) );
  buildTableItem( newCustomer );

};

function init() {
  customers = handleLS('customers',[ ...customersMock ]);
  printIdPayload.list = customers
  printCustomers();
  printId(printIdPayload);
}
init();

