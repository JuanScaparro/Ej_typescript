import { Cliente } from "../models/cliente.model.js";
import { customersMock, prefixObj, totalDigits } from '../utils/data.js';
import { deleteItem, getFormData, handleLS, nextId, printId } from '../utils/utils.js';

let customers: Cliente[] = [];
const lsKey: string = 'customers'
const tbody = document.getElementById( 'tbodyCli' ) as HTMLElement;
const btnFormCli = document.getElementById( 'btnFormCli' ) as HTMLElement;
btnFormCli.addEventListener( 'click', sendForm );
const idCli = document.getElementById( 'idCli' ) as HTMLFormElement;
const btnDelete = document.getElementById( 'tbodyCli' ) as HTMLElement;
btnDelete.addEventListener( 'click', ( e ) => { deleteItem( e, lsKey, tbody, init ) } )



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
    tr.setAttribute( "id", item.id );

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

    const tdDel = document.createElement( 'td' )
    const tdBtnDel = document.createElement( 'button' )
    tdBtnDel.setAttribute( 'class', 'btn btn-danger btn-sm' );
    tdDel.appendChild(tdBtnDel)
    const tdBtnDelText = document.createTextNode( 'Eliminar' );
    tdBtnDel.appendChild( tdBtnDelText );
  
    const tdMod = document.createElement( 'td' )
    const tdBtnMod = document.createElement( 'button' )
    tdBtnMod.setAttribute( 'class', 'btn btn-warning btn-sm' );
    tdMod.appendChild(tdBtnMod)
    const tdBtnModText = document.createTextNode( 'Modificar' );
    tdBtnMod.appendChild( tdBtnModText );

    tr.appendChild( thId );
    tr.appendChild( tdNomCli );
    tr.appendChild( tdApeCli );
    tr.appendChild( tdDniCli );
    tr.appendChild( tdDel );
    tr.appendChild( tdMod );

    tbody.appendChild( tr );
}

function sendForm( event: any ) {
  const formData = getFormData( event );
  addCustomer( formData );
  printId( printIdPayload );
};

function addCustomer( formData: any ) {
  const {error, data} = formData
  if(error) return

  const newCustomer = new Cliente( nextId(customers, prefixObj.customer, totalDigits), data.nameCli, data.apeCli, data.dniCli );

  customers.push( newCustomer );
  localStorage.setItem( lsKey, JSON.stringify( customers ) );
  buildTableItem( newCustomer );
};

function init() {
  customers = handleLS( lsKey, [ ...customersMock ] );
  printIdPayload.list = customers;
  printCustomers();
  printId( printIdPayload );
}
init();