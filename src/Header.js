import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { ConnectBlockchain } from "./utils/SmartContractCaller";
import { Spinner, Dropdown } from "react-bootstrap";
import Save from "./utils/save";
import { connect } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";
import { ethers } from "ethers";
import Moment from "moment";
function Header(props) {
  const [profil, setprofil] = useState({});
  const [orderDetail, setorderDetail] = useState([]);
  const [isLogin, setisLogin] = useState(localStorage.getItem("login"));
  const navigate = useNavigate();
  const listChat = useRef([]);
  const refOrderDetail = useRef([]);
  const listContact = useRef({});
  // const [dataModal, setdataModal] = useState({});

  useEffect(async () => {
    const getCart = async () => {
      const cart = await Save.get("/cart/" + props.wallet);
      props.init(cart);
    };

    const getMyOrder = async () => {
      try {
        const res = await axios.get("/myorder/notif", {
          params: { user_id: props.wallet },
        });
        const orderDetail = res.data;
        //console.log(orderDetail)
        refOrderDetail.current = orderDetail;
        setorderDetail(orderDetail);
      } catch (error) {}
    };

    const getProfil = async () => {
      const profil = await props.contract.wallets(props.wallet);
      //console.log("get profil")
      //console.log(profil)
      //console.log(props.wallet)
      setprofil({ photo: profil.photo, name: profil });
    };
    const getContract = async () => {
      try {
        const myContract = await ConnectBlockchain(isLogin);

        if (isLogin) {
          const accountBalance = await myContract.provider.getBalance(
            myContract.wallet
          );
          const balance = ethers.utils.formatEther(accountBalance.toString());

          props.updateBalance(balance);
          if (!props.socket) {
            const socket = io("https://comercy.site");
            socket.emit("add-user", myContract.wallet);

            props.addSocket(socket);
          }
        } else {
          props.updateBalance(null);
        }

        // const exchangeInfo = await axios.get(
        //   "https://api.binance.com/api/v1/ticker/24hr?symbol=BNBBIDR"
        // );

        props.contractReducers.setPrice(4404902);
        // props.contractReducers.setPrice(parseInt(exchangeInfo.data.lastPrice));
        props.updateContract(myContract);
      } catch (error) {
        //console.log(error)
      }
    };

    if (props.wallet) {
      getCart();
      axios.get("/contact/" + props.wallet).then((res) => {
        const data = res.data;
        const contacts = {};
        const chatList = data.map((room, index) => {
          contacts[room.id] = room;
          return room.id;
        });
        props.addChatInit(contacts);
        props.addChatList(chatList);
        listChat.current = chatList;
        listContact.current = contacts;
      });
      getMyOrder();

      getProfil();
    } else {
      getContract();
    }
    // const getNotif=async()=>{
    //   const notif= await Save.get("")
    // }
  }, [props.wallet, isLogin]);

  useEffect(() => {
    listChat.current = props.chatList;
  }, [props.chatList]);

  useEffect(() => {
    if (props.socket) {
      props.socket.on("msg-recieve", (data) => {
        const listOfChatContact = listChat.current;

        if (!listOfChatContact.includes(data.room_id)) {
          listChat.current = [data.room_id, ...listChat.current];
          const date = new Date();
          const contact = {
            id: data.room_id,
            chats: [
              {
                createdAt: date,
                message: data.msg,
                user_target: data.to,
              },
            ],
            createdAt: date,
            updatedAt: date,
            user_id: `${data.from},${data.to},`,
            newChats: [
              {
                createdAt: date,
                message: data.msg,
                user_target: data.to,
              },
            ],
          };
          listContact.current[data.room_id] = contact;
          props.addContact(data.room_id, contact);
          props.addChat(data.room_id);
        } else {
          console.log(listContact.current);
          const date = new Date();
          const contact_target = listContact.current[data.room_id];
          contact_target.newChats.push({
            message: data.msg,
            user_target: data.to,
            updatedAt: date,
            createdAt: date,
          });
          contact_target.chats = [
            {
              updatedAt: date,
              createdAt: date,
              message: data.msg,
              user_target: data.to,
            },
          ];
          listContact.current[data.room_id] = contact_target;

          props.addContact(data.room_id, contact_target);
        }
      });

      props.socket.on("msg-notif", (data) => {
        refOrderDetail.current = [...data.order, ...refOrderDetail.current];
        setorderDetail(refOrderDetail.current);
      });
    }
  }, [props.socket]);

  const goTo = (url) => {
    //console.log("click url", url);
    navigate(url);
  };
  const loadNotification = () => {
    // return (

    // );
    if (orderDetail.length <= 0) {
      return (
        <Dropdown.Item
          className="d-flex flex-column align-items-start my-2 disabled"
          style={{ height: "auto" }}
        >
          <div className="title-noto-2 text-line-1 w-100">
            No New Notification
          </div>
        </Dropdown.Item>
      );
    }

    return orderDetail.slice(0, 5).map((val, index) => {
      const status = val.status;
      const text =
        status == "Waiting"
          ? "Succesfully sent the Order to Seller"
          : status == "Confirmation"
          ? "Confirmed the Order and has sent Email to " +
            val.email +
            "by Seller"
          : status == "Finished"
          ? "Order Successfully Accepted by buyer and Payment has been paid"
          : "Payment Fee has been Claimed by Seller";

      return (
        <Dropdown.Item
          className="d-flex flex-column align-items-start my-2"
          style={{ height: "auto" }}
          onClick={(e) => {
            e.preventDefault();
            goTo(`/order/${val.orders_id}`);
          }}
          key={index}
        >
          <div className="title-barlow-3">
            <i
              className="material-icons text-primary"
              style={{ verticalAlign: "bottom" }}
            >
              info
            </i>
            . {Moment(val.createdAt).fromNow()}
          </div>
          <div className="title-noto-3 text-line-1 w-100">{text}</div>
        </Dropdown.Item>
      );
    });
  };
  const loadNotifLength = () => {
    let sizeNotif = 0;

    orderDetail.forEach((val, index) => {
      sizeNotif +=
        val.readStatus && val.readStatus.search(props.wallet) >= 0 ? 0 : 1;
    });
    return sizeNotif;
  };
  const loadNewChatsLength = () => {
    let counts = 0;
    props.chatList.map((chatID, index) => {
      const contact = props.chatContact[chatID];
      counts += contact.newChats.length;
    });
    return counts;
  };

  return (
    <div>
      <nav className="top-app-bar navbar navbar-expand navbar-dark bg-dark">
        <div className="container-fluid px-4">
          {/* <!-- Drawer toggle button--> */}
          <button
            className="btn btn-lg btn-icon order-1 order-lg-0"
            id="drawerToggle"
            onClick={(e) => {
              e.preventDefault();

              document.body.classList.toggle("drawer-toggled");
            }}
          >
            <i className="material-icons">menu</i>
          </button>
          {/* <!-- Navbar brand--> */}
          <Link className="navbar-brand me-auto" to="/">
            <div className="text-uppercase font-monospace">ComerCY</div>
          </Link>
          {/* <!-- Navbar items--> */}
          <div className="d-flex align-items-center mx-3 me-lg-0">
            {/* <!-- Navbar--> */}

            {/* <!-- Navbar buttons--> */}
            <div className="d-flex">
              {/* <!-- Messages dropdown--> */}

              {/* <!-- User profile dropdown--> */}
              {/* <button
                className="btn btn-lg btn-icon mx-2 dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
              </button> */}
              <Link
                className="btn btn-lg btn-icon mx-2 btn-overlay d-none d-md-block"
                to="/chat"
              >
                <i className="material-icons">sms</i>
                <span>{loadNewChatsLength()}</span>
              </Link>

              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="bg-none btn-overlay d-none d-md-block"
                  size="lg"
                >
                  <i className="material-icons">notifications</i>
                  <span>{loadNotifLength()}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {loadNotification()}

                  <Dropdown.Item
                    className="title-2 text-primary"
                    style={{ height: "auto" }}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo("/notifications");
                    }}
                  >
                    {" "}
                    See More
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Link
                className="btn btn-lg btn-icon mx-2 btn-overlay d-none d-md-block"
                to="/cart"
              >
                <i className="material-icons">shopping_cart</i>
                <span>{props.cart.length}</span>
              </Link>

              <div className="dropdown">
                <button
                  className="btn btn-lg btn-icon dropdown-toggle mx-2"
                  id="dropdownMenuProfile"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {!props.wallet ? (
                    <i className="material-icons">person</i>
                  ) : (
                    <img
                      style={{
                        height: "inherit",
                        width: "inherit",
                        objectFit: "cover",
                        background: "white",
                      }}
                      src={
                        profil.photo
                          ? profil.photo
                          : "/assets/images/profilTest.png"
                      }
                    />
                  )}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end mt-3"
                  aria-labelledby="dropdownMenuProfile"
                >
                  <li>
                    <Link to="/profile" className="dropdown-item" href="#!">
                      <i className="material-icons leading-icon">person</i>
                      <div className="me-3">Profile</div>
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    {props.wallet ? (
                      <a
                        onClick={() => {
                          ConnectBlockchain(false)
                            .then(async (contract) => {
                              props.updateContract(contract);

                              localStorage.removeItem("login");
                              setisLogin(false);

                              props.updateBalance(null);
                            })
                            .catch((err) => {});
                        }}
                        style={{ cursor: "pointer" }}
                        className="dropdown-item"
                      >
                        <i className="material-icons leading-icon">login</i>

                        <div className="me-3">Logout</div>
                      </a>
                    ) : (
                      <a
                        style={{ cursor: "pointer" }}
                        className="dropdown-item"
                        onClick={() => {
                          ConnectBlockchain(true)
                            .then(async (contract) => {
                              props.updateContract(contract);

                              localStorage.setItem("login", "true");
                              const accountBalance =
                                await contract.provider.getBalance(
                                  contract.wallet
                                );
                              const balance = ethers.utils.formatEther(
                                accountBalance.toString()
                              );
                              props.updateBalance(balance);
                              setisLogin(true);
                            })
                            .catch((err) => {});
                        }}
                      >
                        <i className="material-icons leading-icon">login</i>

                        <div className="me-3">Connect Wallet</div>
                      </a>
                    )}
                  </li>
                </ul>
              </div>
              {props.balance && (
                <span className="font-noto text-white align-self-center d-none d-sm-block">
                  {" "}
                  {props.balance}{" "}
                  <img src="/assets/images/BNB.png" style={{ height: 30 }} />
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* <!-- Layout wrapper--> */}
      <div id="layoutDrawer">
        {/* <!-- Layout navigation--> */}
        <div id="layoutDrawer_nav">
          {/* <!-- Drawer navigation--> */}
          <nav
            className="drawer accordion drawer-light bg-white"
            id="drawerAccordion"
          >
            <div className="drawer-menu">
              <div className="nav">
                {/* <!-- Drawer section heading (Account)--> */}
                {/* <div className="drawer-menu-heading d-md-none">Account</div> */}
                {/* <!-- Drawer link (Notifications)--> */}
                <Link className="nav-link d-md-none" to="/notifications">
                  <div className="nav-link-icon">
                    <i className="material-icons">notifications</i>
                  </div>
                  Notifications
                </Link>
                {/* <!-- Drawer link (Messages)--> */}
                <Link className="nav-link d-md-none" to="/cart">
                  <div className="nav-link-icon">
                    <i className="material-icons">shopping_cart</i>
                  </div>
                  Cart
                </Link>
                <Link className="nav-link d-md-none" to="/chat">
                  <div className="nav-link-icon">
                    <i className="material-icons">sms</i>
                  </div>
                  Chats
                </Link>
                {/* <!-- Divider--> */}
                <div className="drawer-menu-divider d-sm-none"></div>
                {/* <!-- Drawer section heading (Interface)--> */}
                <div className="drawer-menu-heading">Menu</div>
                {/* <!-- Drawer link (Overview)--> */}

                {/* <!-- Drawer link (Dashboards)--> */}
                <Link to="/" className="nav-link">
                  <div className="nav-link-icon">
                    <i className="material-icons">home</i>
                  </div>
                  Home
                </Link>
                <Link className="nav-link" to="/market">
                  <div className="nav-link-icon">
                    <i className="material-icons">language</i>
                  </div>
                  Market
                </Link>

                {/* <!-- Drawer link (Layouts)--> */}
                <Link className="nav-link collapsed" to="/sell">
                  <div className="nav-link-icon">
                    <i className="material-icons">sell</i>
                  </div>
                  Selling
                </Link>

                {/* <!-- Drawer link (Pages)--> */}
                <Link className="nav-link collapsed" to="/profile">
                  <div className="nav-link-icon">
                    <i className="material-icons">person</i>
                  </div>
                  Profile
                </Link>

                {/* <!-- Divider--> */}
                <div className="drawer-menu-divider"></div>
              </div>
            </div>
            {/* <!-- Drawer footer        --> */}
            <div className="drawer-footer border-top">
              <div className="d-flex align-items-center">
                <i className="material-icons text-muted">account_circle</i>
              </div>
            </div>
          </nav>
        </div>
        {/* <!-- Layout content--> */}
        <div
          id="layoutDrawer_content"
          onClick={(e) => {
            // e.preventDefault();
            // if (window.innerWidth >= 992) {
            //   return;
            // }
            if (document.body.classList.contains("drawer-toggled")) {
              document.body.classList.toggle("drawer-toggled");
            }
          }}
        >
          {/* <!-- Main page content--> */}
          <main>
            {/* <!-- Page header--> */}
            {/* <header className="masthead bg-dark">
              <div className="container-xl px-5"></div>
            </header> */}

            <Outlet />
          </main>

          {/* <!-- Footer--> */}
          {/* <!-- Min-height is set inline to match the height of the drawer footer--> */}
          <footer className="py-4 mt-auto border-top" style={{ minHeight: 74 }}>
            <div className="container-xl px-5">
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-sm-between small"></div>
            </div>
          </footer>

          {/* <div
            className="modal fade"
            id="modalLogin"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Sign in With Your Account</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      onChange={updateUsername}
                      value={username}
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="basic-addon1"
                      value={password}
                      onChange={updatePassword}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={submitLogin}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <div className="backdrop-cs d-none" id="loader">
          <div className="backdrop-bg"></div>
          <div className="backdrop-content position-relative flex-column justify-content-center align-items-center">
            <Spinner animation="grow" variant="primary" />
            <div className="text-white fw-bold" id="loaderText">
              {" "}
              Please Wait....
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapToProps = (state) => {
  return {
    wallet: state.ContractReducers.contract.wallet,
    balance: state.BalanceReducers,
    contractReducers: state.ContractReducers,
    provider: state.ContractReducers.contract.provider,
    contract: state.ContractReducers.contract.myContract,
    cart: state.CartReducers,
    socket: state.SocketReducers,
    notif: state.NotifReducers,
    chatList: state.ChatListReducers,
    chatContact: state.ChatReducers,
  };
};
const dispatchToProps = (dispatch) => {
  return {
    add: (data) => {
      dispatch({ type: "add", data });
    },
    init: (data) => {
      dispatch({ type: "init", data });
    },
    notif: (data) => {
      dispatch({ type: "notif", data });
    },
    updateContract: (contract) => {
      dispatch({ type: "update", contract });
    },
    updateBalance: (price) => {
      dispatch({ type: "balance", price });
    },
    addSocket: (socket) => {
      dispatch({ type: "socket", socket });
    },
    addChatList: (chatID) => {
      dispatch({ type: "chatInit", keys: chatID });
    },
    addChat: (chatID) => {
      dispatch({ type: "addChat", key: chatID });
    },
    addChatInit: (data) => {
      dispatch({ type: "contact", data });
    },
    addContact: (chatID, contact) => {
      dispatch({ type: "addContact", key: chatID, contact });
    },
  };
};
export default connect(mapToProps, dispatchToProps)(Header);
