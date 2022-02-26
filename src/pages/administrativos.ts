import { Administrativo } from '../models/administrativo.model.js';
import { administrativesMock, prefixObj, totalDigits } from '../utils/data.js';
import { deleteItem, getFormData, handleLS, nextId, printId } from '../utils/utils.js';


let administratives: Administrativo[] = [];
const lsKey: string = 'administratives'
const tbody = document.getElementById("tbodyAdm") as HTMLElement;
const btnFormAdm = document.getElementById( 'btnFormAdm' ) as HTMLButtonElement;
btnFormAdm.addEventListener( 'click', sendForm );
const idAdm = document.getElementById( 'idAdm' ) as HTMLFormElement;
const btnUpdateSubmit: HTMLButtonElement = <HTMLButtonElement>document.getElementById('btnUpdateModalSubmit') 
btnUpdateSubmit.addEventListener('click', updateSubmit)

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
  //
  const tr = document.createElement( 'tr' );
  tr.setAttribute( "id", item.id );

  const tdId = document.createElement( 'td' );
  tdId.setAttribute( 'scope', 'row' );
  const tdIdText = document.createTextNode( item.id );
  tdId.appendChild( tdIdText );

  const tdNomAdm = document.createElement( 'td' );
  tdNomAdm.setAttribute('id', 'tdName');
  const tdNomAdmText = document.createTextNode( item.nombre );
  tdNomAdm.appendChild( tdNomAdmText );

  const tdApeAdm = document.createElement( 'td' );
  tdApeAdm.setAttribute('id', 'tdApe');
  const tdApeAdmText = document.createTextNode( item.apellido );
  tdApeAdm.appendChild( tdApeAdmText );

  const tdDniAdm = document.createElement( 'td' );
  tdDniAdm.setAttribute('id', 'tdDni');
  const tdDniAdmText = document.createTextNode( item.dni );
  tdDniAdm.appendChild( tdDniAdmText );

  // Boton Elminar
  const tdDel = document.createElement( 'td' )
  const tdBtnDel = document.createElement( 'button' )
  tdBtnDel.setAttribute( 'class', 'btn btn-danger btn-sm' );
  tdBtnDel.setAttribute( 'id', 'btnDel' );
  tdBtnDel.addEventListener( 'click', ( e ) => { deleteItem( e, lsKey, tbody, init )} );
  tdDel.appendChild(tdBtnDel)
  const tdBtnDelText = document.createTextNode( 'Eliminar' );
  tdBtnDel.appendChild( tdBtnDelText );
  
  // Boton Modificar
  const tdMod = document.createElement( 'td' )
  const tdBtnMod: HTMLButtonElement = document.createElement( 'button' )
  tdBtnMod.setAttribute( 'class', 'btn btn-warning btn-sm' );
  tdBtnMod.setAttribute( 'id', 'btnMod' );
  tdBtnMod.setAttribute('data-bs-toggle', 'modal') // lanza el modal
  tdBtnMod.setAttribute('data-bs-target', '#updateModal') // Identifica el modal a lanzar
  tdBtnMod.addEventListener( 'click', ( e ) => { updateItem( e, lsKey, tbody, init )} );
  tdMod.appendChild(tdBtnMod)
  const tdBtnModText = document.createTextNode( 'Modificar' );
  tdBtnMod.appendChild( tdBtnModText );
  
  tr.appendChild( tdId );
  tr.appendChild( tdNomAdm );
  tr.appendChild( tdApeAdm );
  tr.appendChild( tdDniAdm );
  tr.appendChild( tdDel );
  tr.appendChild( tdMod );
  
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
  const newAdministrative = new Administrativo( nextId( administratives, prefixObj.administrative, totalDigits ), data.nameAdm, data.apeAdm, data.dniAdm );
  administratives.push( newAdministrative );
  localStorage.setItem( lsKey, JSON.stringify( administratives ) );
  buildTableItem( newAdministrative );
};

function updateItem( event: any, key: string, tbody: HTMLElement, callback: any ): any {
  event.preventDefault();
  // const itemId: string = event.target.parentElement.parentElement.id;
  const row = event.target.parentElement.parentElement as HTMLElement
  const userId: string = row.id

  const tdName: string = row.querySelector("#tdName")!.textContent!
  const tdApe: string = row.querySelector("#tdApe")!.textContent!
  const tdDni: string = row.querySelector("#tdDni")!.textContent!
  //
  const rowId: HTMLElement = <HTMLElement>document.getElementById('idAdmUpdate');
  const inputModalName: HTMLInputElement = <HTMLInputElement>document.getElementById('nameAdmUpdate');
  const inputModalApe: HTMLInputElement = <HTMLInputElement>document.getElementById('apeAdmUpdate');
  const inputModalDni: HTMLInputElement = <HTMLInputElement>document.getElementById('dniAdmUpdate');

  rowId.innerHTML = userId;
  inputModalName.value = tdName;
  inputModalApe.value = tdApe;
  inputModalDni.value = tdDni;

};

function updateSubmit(event: any): void {
  
  const idModal: string = document.getElementById('idAdmUpdate')!.textContent!;
  const inputModalName: HTMLInputElement = <HTMLInputElement>document.getElementById('nameAdmUpdate');
  const inputModalApe: HTMLInputElement = <HTMLInputElement>document.getElementById('apeAdmUpdate');
  const inputModalDni: HTMLInputElement = <HTMLInputElement>document.getElementById('dniAdmUpdate');


  administratives.forEach( item => {
    if( item.id === idModal){
      item.nombre = inputModalName.value
      item.apellido = inputModalApe.value
      item.dni = inputModalDni.value
    }
  })

  localStorage.setItem("administratives", JSON.stringify(administratives))
  tbody.innerHTML = "";
  init()

}

function init() {
  administratives = handleLS( lsKey,[ ...administrativesMock ] );
  printIdPayload.list = administratives;
  printAdministratives();
  printId( printIdPayload );
}
init();