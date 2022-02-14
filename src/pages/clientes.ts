import { Cliente } from "../models/cliente.model.js";
import { clientsMock } from '../utils/data.js';
import { getFormData } from '../utils/utils.js';

let clients: Cliente[] = [];
const tbodyCli = document.getElementById( 'tbodyCli' ) as HTMLElement;
const btnFormCli = document.getElementById( 'btnFormCli' ) as HTMLElement;
btnFormCli.addEventListener( 'click', sendForm );


function printClients(): void {
  clients.forEach( ( item ) => {
    buildTableItem( item );
  } );
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
  console.log( formData );
  addClient( formData );
};

function addClient( formData: any ) {
  const newClient = new Cliente( formData.idCli, formData.nameCli, formData.apeCli, formData.dniCli );
  if( newClient.id === '' || newClient.nombre === '' || newClient.apellido === '' || newClient.dni === '' ){
    alert( 'Complete todos los campos del nuevo cliente' );
  }else{
    clients.push( newClient );
    localStorage.setItem( 'clients', JSON.stringify( newClient ) );
    buildTableItem( newClient );
  };
};

function init() {
  clients = [ ...clientsMock ];
  const clientsLS = localStorage.getItem( 'clients' );

  if( clientsLS ){
    clients = JSON.parse( clientsLS );
  }else{
    localStorage.setItem( 'clients', JSON.stringify( clients ) );
  }
  printClients();
}
init();