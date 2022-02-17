import { Administrativo } from '../models/administrativo.model.js';
import { administrativeMock, prefixObj, totalDigits } from '../utils/data.js';
import { getFormData, getNewFullId, getNewIdNumber } from '../utils/utils.js';



let administratives: Administrativo[] = [];
const tbodyAdm = document.getElementById("tbodyAdm") as HTMLElement;
const btnFormAdm = document.getElementById( 'btnFormAdm' ) as HTMLButtonElement;
btnFormAdm.addEventListener( 'click', sendForm );
const idAdm = document.getElementById( 'idAdm' ) as HTMLFormElement;

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
  printId();
}

function nextId(): string {

  const prevId = administratives[ administratives.length - 1 ].id;
  const newIdNumber = getNewIdNumber( prevId , prefixObj.administrative );
  const newFullId = getNewFullId( newIdNumber, prefixObj.administrative, totalDigits );

  return newFullId;

};

function printId() {

  const isH2: boolean = idAdm.hasChildNodes();

  if( isH2 ) {
    idAdm.getElementsByTagName( 'h2' )[0].innerHTML = nextId();
  }else {
    const nodoH2 = document.createElement( 'h2' );
    const h2Text = document.createTextNode( nextId() );
    nodoH2.appendChild( h2Text );
    idAdm.appendChild( nodoH2 );
  }

};

function addAdmin( formData: any ) {

  const newAdministrative = new Administrativo( nextId(), formData.nameAdm, formData.apeAdm, formData.dniAdm );
  if( newAdministrative.id === '' || newAdministrative.nombre === '' || newAdministrative.apellido === '' || newAdministrative.dni === '' ){
    alert( 'Complete todos los campos del nuevo Administrativo' );
  }else{
    administratives.push( newAdministrative );
    localStorage.setItem( 'administratives', JSON.stringify( administratives ) );
    buildTableItem( newAdministrative );
  };
}

function init() {
  administratives = [ ...administrativeMock ];
  const administrativesLS = localStorage.getItem( 'administratives' );

  if( administrativesLS ){
    administratives = JSON.parse( administrativesLS );
  }else{
    localStorage.setItem( 'administratives', JSON.stringify( administratives ) );
  }
  printAdministratives();
  printId();
}
init();