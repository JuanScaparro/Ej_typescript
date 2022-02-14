import { Proveedor } from "../models/proveedor.model.js";
import { providersMock } from '../utils/data.js';
import { getFormData } from '../utils/utils.js';


let providers: Proveedor[] = [];
const tbodyProv = document.getElementById( 'tbodyProv' ) as HTMLElement;
const btmFormProv = document.getElementById( 'btnFormProv' ) as HTMLElement;
btmFormProv.addEventListener( 'click', sendForm );

function printProvider(): void {
  providers.forEach( item => {
    builtTableItem( item );
  } );  
};

function builtTableItem( item: any ) {

    const tr = document.createElement( 'tr' );

    const thIdProv = document.createElement( 'th' );
    thIdProv.setAttribute( 'scope', 'row' );
    const thIdProvText = document.createTextNode( item.id );
    thIdProv.appendChild( thIdProvText );

    const tdNomProv = document.createElement( 'td' );
    const tdNomProvText = document.createTextNode( item.nombre );
    tdNomProv.appendChild( tdNomProvText );

    const tdApeProv = document.createElement( 'td' );
    const tdApeProvText = document.createTextNode( item.apellido );
    tdApeProv.appendChild( tdApeProvText );

    const tdDniProv = document.createElement( 'td' );
    const tdDniProvText = document.createTextNode( item.dni );
    tdDniProv.appendChild( tdDniProvText );
    
    tr.appendChild( thIdProv );
    tr.appendChild( tdNomProv );
    tr.appendChild( tdApeProv );
    tr.appendChild( tdDniProv );
    
    tbodyProv.appendChild( tr );
}

function sendForm( event: any ) {
  const formData = getFormData( event );
  console.log( formData );
  addProvider( formData );
};

function addProvider( formData: any ) {
  const newProvider = new Proveedor( formData.idProv, formData.nameProv, formData.apeProv, formData.dniProv );
  if( newProvider.id === '' || newProvider.nombre === '' || newProvider.apellido === '' || newProvider.dni === '' ){
    alert( 'Complete todos los campos del nuevo proveedor' );
  }else{
    providers.push( newProvider );
    localStorage.setItem( 'providers', JSON.stringify( newProvider ) );
    builtTableItem( newProvider );
  };
};

function init() {
  providers = [ ...providersMock ];
  const providersLS = localStorage.getItem( 'providers' );

  if( providersLS ){
    providers = JSON.parse( providersLS );
  }else{
    localStorage.setItem( 'providers', JSON.stringify( providers ) );
  }
  printProvider();
}
init();