import Session from "./session";
export const ContractReducers = (state = new Session({myContract:null,wallet:null}), action) => {
    const price = state.price;
  switch (action.type) {
    case "save":
      state = new Session(action.contract);
      state.setPrice(price);
      return state;
    case "update":
      state = new Session(action.contract);
      state.setPrice(price);
      break;
    default:
      return state;
  }

  return state;
};
export const BalanceReducers = (state = null, action) => {
  switch (action.type) {
    case "balance":
      state = action.price;
      return state;
    default:
      return state;
  }
};

export const CartReducers = (state = [], action) => {
  switch (action.type) {
    case "init":
      state = action.data;
      return state;
    case "add":
      state = [...state, action.data];
      return state;
      break;
    case "delete":
      state.splice(action.index, 1);
      return state;
      break;
    default:
      return state;
  }

  return state;
};
export const NotifReducers = (state = [], action) => {
  switch (action.type) {
    case "notif":
      state = action.data;
      return state;
    default:
      return state;
  }

  return state;
};
export const ChatListReducers = (state = [], action) => {
  switch (action.type) {
    case "chatInit":
      state = action.keys
      // action.data;
      return state;
    case "addChat":
      state = [action.key,...state]
      return state;
    default:
      return state;
  }

  return state;
};

export const ChatReducers = (state = {}, action) => {
  switch (action.type) {
    case "contact":
      state = action.data;
      // action.data;
      return state;
    case "addContact":
      state[action.key]=action.contact;
      return {...state};
    default:
      return state;
  }

  return state;
};

export const SocketReducers = (state = null , action) => {
  switch (action.type) {
    case "socket":
      state = action.socket;
      // action.data;
      return state;
    default:
      return state;
  }

  return state;
};

