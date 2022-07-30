
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import RouterFs from "./RouterFs";
import axios from "axios";
import {Provider} from "react-redux"
import {combineReducers, createStore} from "redux";
import {ContractReducers,CartReducers,NotifReducers,BalanceReducers,SocketReducers,ChatReducers,ChatListReducers} from "./utils/reducer"
import "bootstrap/dist/js/bootstrap.js"


// state.updateData({id:3,name:"oscar",username:"admin",password:"admin001",saldo:100});
//   state.updateSessionTime(new Date())
// if(window.__state && window.__state.isLogin){
//   state.updateData(window.__state.data);
//   state.updateSessionTime(new Date())
// }
// axios.defaults.baseURL="http://localhost:8000/api"
axios.defaults.baseURL="/api"


// ConnectBlockchain(isLogin).then(async contract=>{
  const reducer= combineReducers({ContractReducers,CartReducers,NotifReducers,BalanceReducers,SocketReducers,ChatReducers,ChatListReducers})
  
  const store = createStore(reducer)
//   const state= store.getState()
//   if(isLogin){
//     //console.log(isLogin)

    // const accountBalance = await contract.provider.getBalance(contract.wallet)
    // const balance = ethers.utils.formatEther(accountBalance.toString())
    // state.BalanceReducers = balance;
//   }
//   state.ContractReducers.setContract(contract);
  
  // try {
  //   const exchangeInfo= await axios.get("https://api.binance.com/api/v1/ticker/24hr?symbol=BNBBIDR")
  
  //   state.ContractReducers.setPrice(4351650)
  // state.ContractReducers.setPrice(parseInt(exchangeInfo.data.lastPrice))
  ReactDOM.render(
    <Provider store={store}>
        <RouterFs />
      </Provider>,
    document.getElementById("root")
  );
//   } catch (error) {
//     //console.log(error)
//   }
  
// }).catch(err=>{
//   //console.log(err)
// })

