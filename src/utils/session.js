import $ from "jquery"
import {Modal} from "bootstrap"
class Session {
  constructor(contract) {
    this.contract = contract;
    this.price = 0;
  }
  
  setPrice(_price){
    this.price=_price;
  }
  setContract(contract){
    this.contract=contract;
  }

  isAuth() {
    if(this.contract != null){
      return true;
    }
    return false;
  
  }
}
export default Session