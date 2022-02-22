import { Administrativo } from '../models/administrativo.model.js';
import { administrativesMock, prefixObj, totalDigits } from '../utils/data.js';
import { deleteItem, getFormData, handleLS, nextId, printId } from '../utils/utils.js';



let administratives: Administrativo[] = [];
const lsKey: string = 'administratives'
const tbody = document.getElementById("tbodyAdm") as HTMLElement;
const btnFormAdm = document.getElementById( 'btnFormAdm' ) as HTMLButtonElement;
btnFormAdm.addEventListener( 'click', sendForm );
const idAdm = document.getElementById( 'idAdm' ) as HTMLFormElement;
const btnDelete = document.getElementById( 'tbodyAdm' ) as HTMLElement;
btnDelete.addEventListener( 'click', function (e) {
  deleteItem(e, lsKey, tbody, init)
} );


const printIdPayload = {
  idForm: idAdm,
  list: administratives,
  prefix: prefixObj.administrative,
  totalDigits: totalDigits
};

function printAdministratives(): void {
  administratives.forEach( item => { buildTableItem( item ) });
};

function buildTableItem( item: any ){

  const tr = document.createElement( 'tr' );
  tr.setAttribute( "id", item.id );

  const tdId = document.createElement( 'td' );
  tdId.setAttribute( 'scope', 'row' );
  const tdIdText = document.createTextNode( item.id );
  tdId.appendChild( tdIdText );

  const tdNomAdm = document.createElement( 'td' );
  const tdNomAdmText = document.createTextNode( item.nombre );
  tdNomAdm.appendChild( tdNomAdmText );

  const tdApeAdm = document.createElement( 'td' );
  const tdApeAdmText = document.createTextNode( item.apellido );
  tdApeAdm.appendChild( tdApeAdmText );

  const tdDniAdm = document.createElement( 'td' );
  const tdDniAdmText = document.createTextNode( item.dni );
  tdDniAdm.appendChild( tdDniAdmText );

  const td = document.createElement( 'td' )
  const tdBtn = document.createElement( 'button' )
  tdBtn.setAttribute( 'class', 'btn btn-danger btn-sm' );
  td.appendChild(tdBtn)
  const tdBtnText = document.createTextNode( 'Eliminar' );
  tdBtn.appendChild( tdBtnText );

  tr.appendChild( tdId );
  tr.appendChild( tdNomAdm );
  tr.appendChild( tdApeAdm );
  tr.appendChild( tdDniAdm );
  tr.appendChild( td );

  tbody.appendChild( tr );
}

function sendForm( event: any ) {
  const formData = getFormData( event );
  addAdmin( formData );
  printId(printIdPayload);
};

function addAdmin( formData: any ) {
  const {error, data} = formData
  if(error) return  
  const newAdministrative = new Administrativo( nextId(administratives, prefixObj.administrative, totalDigits), data.nameAdm, data.apeAdm, data.dniAdm );
  administratives.push( newAdministrative );
  localStorage.setItem( lsKey, JSON.stringify( administratives ) );
  buildTableItem( newAdministrative );
};

function init() {
  administratives = handleLS(lsKey,[ ...administrativesMock ]);
  printIdPayload.list = administratives;
  printAdministratives();
  printId(printIdPayload);
}
init();
