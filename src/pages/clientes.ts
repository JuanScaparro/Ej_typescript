import { IInputsIds } from "../interfaces/iInputsIds.js";
import { Cliente } from "../models/cliente.model.js";
import { customersMock, prefixObj, totalDigits } from '../utils/data.js';
import { deleteItem, getFormData, handleLS, nextId, printId, updateItem } from '../utils/utils.js';

let customers: Cliente[] = [];
const lsKey: string = 'customers';
const tbody = document.getElementById( 'tbodyCli' ) as HTMLElement;
const btnFormCli = document.getElementById( 'btnFormCli' ) as HTMLElement;
btnFormCli.addEventListener( 'click', sendForm );
const idCli = document.getElementById( 'idCli' ) as HTMLFormElement;
const btnUpdateSubmit: HTMLButtonElement = <HTMLButtonElement>document.getElementById( 'btnUpdateModalSubmit' );
btnUpdateSubmit.addEventListener( 'click', updateSubmit );



const printIdPayload = {
  idForm: idCli,
  list: customers,
  prefix: prefixObj.customer,
  totalDigits: totalDigits
};

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
    tdNomCli.setAttribute('id', 'tdName');
    const tdNomCliText = document.createTextNode( item.nombre );
    tdNomCli.appendChild( tdNomCliText );

    const tdApeCli = document.createElement( 'td' );
    tdApeCli.setAttribute('id', 'tdApe');
    const tdApeCliText = document.createTextNode( item.apellido );
    tdApeCli.appendChild( tdApeCliText );

    const tdDniCli = document.createElement( 'td' );
    tdDniCli.setAttribute('id', 'tdDni');
    const tdDniCliText = document.createTextNode( item.dni );
    tdDniCli.appendChild( tdDniCliText );

    const tdDel = document.createElement( 'td' )
    const tdBtnDel = document.createElement( 'button' );
    tdBtnDel.setAttribute( 'class', 'btn btn-danger btn-sm' );
    tdBtnDel.setAttribute( 'id', 'btnDel' );
    tdBtnDel.addEventListener( 'click', ( e ) => { deleteItem( e, lsKey, tbody, init )} );
    tdDel.appendChild(tdBtnDel);
    const tdBtnDelText = document.createTextNode( 'Eliminar' );
    tdBtnDel.appendChild( tdBtnDelText );
  
    const tdMod = document.createElement( 'td' )
    const tdBtnMod = document.createElement( 'button' );
    tdBtnMod.setAttribute( 'class', 'btn btn-warning btn-sm' );
    tdBtnMod.setAttribute( 'id', 'btnMod' );
    tdBtnMod.setAttribute('data-bs-toggle', 'modal');
    tdBtnMod.setAttribute('data-bs-target', '#updateModal');
    const rowIdElement: HTMLElement = <HTMLElement>document.getElementById( 'idUpdate' )
    const inputs: IInputsIds[] = [
      {
        form: "tdName",
        modal: "nameUpdate"
      },
      {
        form: "tdApe",
        modal: "apeUpdate"
      },
      {
        form: "tdDni",
        modal: "dniUpdate"
      }
    ]
    tdBtnMod.addEventListener( 'click', ( e ) => { updateItem( e, rowIdElement, inputs)} );
    tdMod.appendChild(tdBtnMod);
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

const inputsModifyModal = {
  name: <HTMLInputElement>document.getElementById( 'nameUpdate' ),
  ape: <HTMLInputElement>document.getElementById( 'apeUpdate' ),
  dni: <HTMLInputElement>document.getElementById( 'dniUpdate' )
};

function updateSubmit(): void {
  
  const idModal: string = ( document.getElementById( 'idUpdate' ) as HTMLElement ).textContent!;

  customers.forEach( item => {
    if( item.id === idModal ){
      item.nombre = ( inputsModifyModal.name as HTMLInputElement ).value;
      item.apellido = ( inputsModifyModal.ape as HTMLInputElement ).value;
      item.dni = ( inputsModifyModal.dni as HTMLInputElement ).value; 
    }
  });

  localStorage.setItem( lsKey, JSON.stringify( customers ) ); 
  tbody.innerHTML = '';
  init();
};

function init() {
  customers = handleLS( lsKey, [ ...customersMock ] );
  printIdPayload.list = customers;
  printCustomers();
  printId( printIdPayload );
}
init();