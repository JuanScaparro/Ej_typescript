import { productsMock, customersMock, salesMock, providersMock, administrativesMock, sellersMock } from "../utils/data.js";
import { handleLS } from "../utils/utils.js";

const defaultDataList = [
  {
    key: "products",
    mock: [...productsMock]
  },
  {
    key: "clients",
    mock: [...customersMock]
  },
  {
    key: "sales",
    mock: [...salesMock]
  },
  {
    key: "providers",
    mock: [...providersMock]
  },
  {
    key: "administratives",
    mock: [...administrativesMock]
  },
  {
    key: "sellers",
    mock: [...sellersMock]
  },
]


function init(){
  defaultDataList.forEach( item =>  handleLS( item.key, item.mock))
}

init()
