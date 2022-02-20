import { Administrativo } from '../models/administrativo.model.js';
import { administrativesMock, prefixObj, totalDigits } from '../utils/data.js';
import { getFormData, handleLS, nextId, printId } from '../utils/utils.js';



let administratives: Administrativo[] = [];
const tbodyAdm = document.getElementById("tbodyAdm") as HTMLElement;
const btnFormAdm = document.getElementById( 'btnFormAdm' ) as HTMLButtonElement;
btnFormAdm.addEventListener( 'click', sendForm );
const idAdm = document.getElementById( 'idAdm' ) as HTMLFormElement;
const printIdPayload = {
  idForm: idAdm,
  list: administratives,
  prefix: prefixObj.administrative,
  totalDigits: totalDigits
}

function printAdministratives(): void {

  administratives.forEach( item => { buildTableItem( item ) });

};

function buildTableItem( item: any ){

  const tr = document.createElement( 'tr' );

  const thId = document.createElement( 'th' );
  thId.setAttribute( 'scope', 'row' );
  const thIdText = document.createTextNode( item.id );
  thId.appendChild( thIdText );

  const tdNomAdm = document.createElement( 'td' );
  const tdNomAdmText = document.createTextNode( item.nombre );
  tdNomAdm.appendChild( tdNomAdmText );

  const tdApeAdm = document.createElement( 'td' );
  const tdApeAdmText = document.createTextNode( item.apellido );
  tdApeAdm.appendChild( tdApeAdmText );

  const tdDniAdm = document.createElement( 'td' );
  const tdDniAdmText = document.createTextNode( item.dni );
  tdDniAdm.appendChild( tdDniAdmText );

  tr.appendChild( thId );
  tr.appendChild( tdNomAdm );
  tr.appendChild( tdApeAdm );
  tr.appendChild( tdDniAdm );

  tbodyAdm.appendChild( tr );
}

function sendForm( event: any ) {
  const formData = getFormData( event );
  addAdmin( formData );
  printId(printIdPayload);
}


function addAdmin( formData: any ) {
  const {error, data} = formData
  if(error) return
  
  const newAdministrative = new Administrativo( nextId(administratives, prefixObj.administrative, totalDigits), data.nameAdm, data.apeAdm, data.dniAdm );

  administratives.push( newAdministrative );
  localStorage.setItem( 'administratives', JSON.stringify( administratives ) );
  buildTableItem( newAdministrative );

}

function init() {
  administratives = handleLS('administravives',[ ...administrativesMock ]);
  printIdPayload.list = administratives
  printAdministratives();
  printId(printIdPayload);
}
init();