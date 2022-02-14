import { Producto } from "../models/producto.model.js";

export function getFormData(event: any): any  {
  event.preventDefault();
  const formRefId = event.target.parentElement.id;
  const formRef: HTMLFormElement = <HTMLFormElement>document.getElementById( formRefId );
  const inputs = formRef.querySelectorAll( "input" );
  const selects = formRef.querySelectorAll( "select" );
  let result = {}

  inputs.forEach( (input:HTMLInputElement) => {
    result = {
      ...result,
      [input.id]: input.value
    }
  })
  selects.forEach( (select: HTMLSelectElement) => {
    result = {
      ...result,
      [select.id]: select.options[select.selectedIndex].value
    }
  })
  formRef.reset();
  return result;
}

export function getDiscount( item: number ): number {
  const price = item
  const discount =  price *0.10
  const resultDisc = price - discount
  return  Number(resultDisc.toFixed(2))
}

export function getDiscountPercent( item: number ): number {
  const price = item
  const discount = price - getDiscount(item) //price *0.10
  return Number(discount.toFixed(2))
}


export function buildSelectOptions(list: any[], selectRef: HTMLSelectElement) {
  list.forEach(item => {
    const opt = document.createElement( 'option' );
    opt.setAttribute( 'value', item.id );
    let optText
    if( item instanceof Producto){
      optText = document.createTextNode( `${item.descripcion}` );
    } else {
      optText = document.createTextNode( `${item.nombre} ${item.apellido}` );
    }
    opt.appendChild(optText);
    selectRef.appendChild(opt);
  });
  
};


export function getNewFullId(id:string, prefix: string, totalDigits: number) {               
  return id.length >= totalDigits 
      ? prefix + id
      : prefix + new Array( totalDigits - id.length + 1).join('0') + id;
}

export function getNewIdNumber( prevId: string, prefix:string ): string{
  const idToEval: number = parseInt(prevId.slice(prefix.length))
 const newId = (idToEval + 1).toString()
 return newId
}