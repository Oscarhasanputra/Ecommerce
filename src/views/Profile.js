import { useEffect, useState, useRef } from "react";
import Save from "../utils/save";
import $ from "jquery";
import { ethers } from "ethers";
import { Modal, Button, Tab, Nav, Spinner } from "react-bootstrap";
import { Loader } from "../utils/loader";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
const ProfileDraft = ({ ...props }) => {
  const wallet = useSelector(
    (session) => session.ContractReducers.contract.wallet
  );
  const priceBNB = useSelector((session) => session.ContractReducers.price);
  const [data, setdata] = useState([]);
  const [show, setshow] = useState(true);
  useEffect(() => {
    if (wallet) {
      axios
        .get("/products/owner", { params: { wallet } })
        .then((res) => {
          const dataProduct = res.data.data;
          setdata(dataProduct);
          setshow(false);
        })
        .catch((err) => {
          //console.log("");
        });
    }
  }, [wallet]);

  const DraftCard = ({ product }) => {
    const navigate = useNavigate();
    const [products, setproducts] = useState(product);
    const isMounted = useRef(false);
    const contract = useSelector(
      (session) => session.ContractReducers.contract.myContract
    );
    // //console.log(product)
    useEffect(() => {
      isMounted.current = true;
      const getDetail = async () => {
        const detailProduct = await contract.productDetail(product.id);
        // //console.log(detailProduct)
        if (detailProduct && isMounted.current) {
          const { photo } = detailProduct;
          setproducts({ ...products, photo });
        }
      };

      getDetail();
      return () => (isMounted.current = false);
    }, []);
    const goTo = (url) => {
      navigate(url);
    };
    const favorite = () => {
      Save.post("/product/" + product.productID)
        .then((res) => {
          products.rating += 1;
          setproducts({ ...products });
        })
        .catch((err) => {});
    };

    return (
      <div className="col-10 mx-2 mx-md-4 col-sm-5 col-md-3 mb-5 rounded shadow-4 p-0 ">
        <div className="btn-overlay image-card">
          <img
            className="d-block rounded"
            src={"/assets/" + products.photo}
            onClick={() => {
              goTo("/item/" + products.id);
            }}
          ></img>
          <span
            onClick={() => {
              goTo("/edit/" + products.id);
            }}
            style={{ padding: 0, cursor: "pointer", top: -10, right: -10 }}
          >
            <i className="material-icons" style={{ padding: 15 }}>
              edit
            </i>
          </span>
        </div>

        {/* <a className="d-block ripple-gray rounded shadow-3 overflow-hidden mb-2"><img className="img-fluid" src="https://assets.startbootstrap.com/img/screenshots-product-pages/material-admin-pro/dashboards/default.png" alt="..." /></a> */}
        <div className="d-flex flex-column p-3">
          <div className="font-roboto text-line-3 title-barlow-1">
            {products.name}{" "}
          </div>
          <div className="d-flex flex-row justify-content-between">
            <div className="font-noto fw-bold title-noto-2">
              {(products.price / priceBNB).toFixed(8)}{" "}
              <img src="/assets/images/BNB.png" style={{ height: 30 }}></img>
            </div>

            <div className="title-noto-2" style={{ fontSize: 18 }}>
              Book
            </div>
          </div>
          <div className="d-flex flex-row mt-4">
            <i className="material-icons">person</i>
            <div className="title-barlow-2 fw-bold text-line-1">
              {products.owner}
            </div>
          </div>
        </div>
        <div className="px-3 py-2 d-flex justify-content-center flex-row">
          <div
            className="px-3 py-2 font-noto fw-bold d-flex justify-content-center flex-row row"
            style={{ color: "#018AD7", cursor: "pointer" }}
          >
            {/* <div className="wrapper"> */}
            <div className="switch_box box_1 col-8">
              <input
                type="checkbox"
                checked={products.status == "ON"}
                className="switch_1"
                onChange={function (e) {
                  const status = e.target.checked;

                  $(e.target).prop("checked", !status); //
                  const text = status ? "ON" : "OFF";
                  Save.put("/products", products.id, { status: text })
                    .then((res) => {
                      $(e.target).prop("checked", status);
                    })
                    .catch(() => {});
                }}
              />
            </div>

            <span className="font-roboto-2 text-center mt-2">Published</span>
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  };
  const loadCard = () => {
    const cards = data.map((prod, index) => {
      return <DraftCard product={prod} key={index} />;
    });
    return cards;
  };
  return (
    <div className="mt-5 row justify-content-center">
      {loadCard()}
      {show && <Spinner animation="border" size="lg" />}
      {data.length <= 0 && !show && (
        <div className="d-flex align-items-center flex-column justify-content-center">
          <i className="material-icons text-danger" style={{ fontSize: 100 }}>
            search_off
          </i>
          <div className="title-1 ">You Haven`t Own Any Product</div>
        </div>
      )}
    </div>
  );
};
const OrderRow = ({ order, index, setmodalShow }) => {
  const contract = useSelector(
    (session) => session.ContractReducers.contract.myContract
  );
  const priceBNB = useSelector((session) => session.ContractReducers.price);
  const navigate = useNavigate();
  const session = useSelector((state) => state.ContractReducers.contract);
  const Socket = useSelector((state) => state.SocketReducers);

  const calculateDays = (dateOrder) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(dateOrder);
    const secondDate = new Date();

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
  };
  const refund = (price) => {
    // //console.log(order)
    Swal.fire({
      title: "Refund Your Payment Product",
      text: "Your Payment Fee is About " + price + " BNB",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Refund to Wallet",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const weiPrice = ethers.utils.parseUnits(price.toString(), "ether");
        const weiPriceStr = weiPrice.toString();
        try {
          Loader.show("Initializing Wallet for Confirmation....");
          const tx = await contract.refund(order.seller_id, weiPriceStr);
          Loader.show("Refund Saldo to your Wallet...");
          await tx.wait();
          const gasLimit = tx.gasLimit.toNumber();
          const gasPrice = ethers.utils.formatEther(tx.gasPrice.toNumber());
          const totalFee = (gasLimit * gasPrice).toFixed(8);

          Save.post("/order/confirm", {
            id: order.id,
            status: "Refund",
            gas: totalFee,
            txid: tx.hash,
          })
            .then((res) => {
              const responseData = res.data;
              if (responseData) {
                const targetAddress =
                  order.buyer_id == session.wallet
                    ? order.seller_id
                    : order.buyer_id;
                const dataMsg = {
                  to: targetAddress,
                  order: [responseData],
                };
                // console.log(dataMsg)
                Socket.emit("send-notif", dataMsg);
              }
              Loader.hide();
              navigate(0);
            })
            .catch((err) => {
              Loader.hide();
              navigate(0);
            });
        } catch (error) {
          //console.log(error);
        }
      }
    });
  };
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{order.product && order.product.name}</td>
      <td>{order.createdAt}</td>
      <td>{order.status}</td>
      <td>
        <div className="d-flex flex-row">
          <Link to={"/order/" + order.id} className="btn btn-primary me-2">
            Check
          </Link>
          {order.status == "Confirmation" && (
            <button
              className="btn btn-success"
              onClick={() => setmodalShow(order)}
            >
              Feedback
            </button>
          )}
          {order.status == "Waiting" && calculateDays(order.createdAt) >= 3 && (
            <button
              className="btn btn-success"
              onClick={() => refund(order.price)}
            >
              Refund
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
const SellingRow = ({ selling, index, setmodalSell }) => {
  const contract = useSelector(
    (session) => session.ContractReducers.contract.myContract
  );
  const priceBNB = useSelector((session) => session.ContractReducers.price);
  const navigate = useNavigate();
  const session = useSelector((state) => state.ContractReducers.contract);
  const Socket = useSelector((state) => state.SocketReducers);
  const onClaim = async (price) => {
    Swal.fire({
      title: "Claiming Your Payment Product",
      text: "Your Payment Fee is About " + price + " BNB",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Claim to Wallet",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const weiPrice = ethers.utils.parseUnits(price.toString(), "ether");
        const weiPriceStr = weiPrice.toString();
        try {
          Loader.show("Initializing Wallet for Confirmation....");
          const tx = await contract.withdraw(weiPriceStr);
          Loader.show(" Claim Saldo to your Wallet...");
          await tx.wait();
          const gasLimit = tx.gasLimit.toNumber();
          const gasPrice = ethers.utils.formatEther(tx.gasPrice.toNumber());
          const totalFee = (gasLimit * gasPrice).toFixed(8);

          Save.post("/order/confirm", {
            id: selling.id,
            status: "Claimed",
            gas: totalFee,
            txid: tx.hash,
          })
            .then((res) => {
              const responseData = res.data;
              if (responseData) {
                const targetAddress =
                  selling.buyer_id == session.wallet
                    ? selling.seller_id
                    : selling.buyer_id;
                const dataMsg = {
                  to: targetAddress,
                  order: [responseData],
                };

                Socket.emit("send-notif", dataMsg);
              }
              Loader.hide();
              navigate(0);
            })
            .catch((err) => {
              Loader.hide();
              navigate(0);
            });
        } catch (error) {
          //console.log(error);
        }
      }
    });
  };
  //console.log(selling)
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{selling.product && selling.product.name}</td>
      <td>{selling.createdAt}</td>
      <td>{selling.status}</td>
      <td>
        <div className="d-flex flex-row">
          <Link to={"/order/" + selling.id} className="btn btn-primary me-2">
            Check
          </Link>
          {selling.status == "Waiting" && (
            <button
              className="btn btn-success"
              onClick={() => setmodalSell(selling)}
            >
              Confirm
            </button>
          )}
          {selling.status == "Finished" && (
            <button
              className="btn btn-success"
              onClick={() => onClaim(selling.price)}
            >
              Claim
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
function Profile() {
  const [myOrders, setmyOrders] = useState([]);
  const [filteredOrder, setfilteredOrder] = useState("myorder");
  const [mySell, setmySell] = useState([]);
  const [profil, setprofil] = useState({});
  const [modalShow, setmodalShow] = useState(false);
  const [modalSell, setmodalSell] = useState(false);

  const Socket = useSelector((state) => state.SocketReducers);
  const address = useSelector(
    (state) => state.ContractReducers.contract.wallet
  );
  const contract = useSelector(
    (state) => state.ContractReducers.contract.myContract
  );
  const [dataModal, setdataModal] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // axios.get("asd",{data:{}})
    const getProfile = async () => {
      const { email, name, photo, profesi } = await contract.wallets(address);
      setprofil({ email, name, photo, profesi });
    };

    if (address != null) {
      getProfile();
      axios
        .get("/myorder", { params: { user_id: address } })
        .then((res) => {
          const { data } = res;

          setmyOrders(data.myOrder);
          setmySell(data.mySelling);
        })
        .catch((err) => {});
    }
  }, [address]);

  const showModalSelling = async (data) => {
    const { name } = await contract.wallets(data.buyer_id);
    setdataModal({ ...data, buyer: name });
    setmodalSell(true);
  };
  const showModalOrder = (data) => {
    setdataModal(data);

    setmodalShow(true);
  };
  const loadOrder = () => {
    return myOrders.map((orders, index) => {
      return (
        <OrderRow
          key={index}
          index={index + 1}
          order={orders}
          setmodalShow={showModalOrder}
        />
      );
    });
  };
  const loadSell = () => {
    return mySell.map((selling, index) => {
      return (
        <SellingRow
          key={index}
          index={index + 1}
          selling={selling}
          setmodalSell={showModalSelling}
        />
      );
    });
  };
  const onConfirm = (status) => {
    Save.post("/order/confirm", { id: dataModal.id, status })
      .then((res) => {
        const responseData = res.data;
        if (responseData) {
          const targetAddress =
            dataModal.buyer_id == address
              ? dataModal.seller_id
              : dataModal.buyer_id;
          const dataMsg = {
            to: targetAddress,
            order: [responseData],
          };

          Socket.emit("send-notif", dataMsg);
        }
        Loader.hide();
        navigate(0);
      })
      .catch((err) => {
        Loader.hide();
        navigate(0);
      });
  };

  return (
    <div className="container-xl p-5">
      <div className="d-flex flex-column flex-md-row justify-content-center my-2">
        <div className="btn-overlay-bottom align-self-center">
          <img
            className="img-card-circle align-self-center"
            src={profil.photo ? profil.photo : "/assets/images/profilTest.png"}
          ></img>
          <span className="bg-primary d-inline d-md-none">
            <Link to="/profile/edit" className="no-style">
              <i
                className="material-icons align-self-center p-2"
                style={{ cursor: "pointer" }}
              >
                border_color
              </i>
            </Link>
          </span>
        </div>
        <div className="d-flex align-items-center align-items-md-start flex-column justify-content-center mx-2">
          <div
            className="title-roboto-1 fw-bold my-1 "
            style={{ letterSpacing: 1 }}
          >
            {profil.name ? profil.name : "Unknown Name"}
          </div>
          <div className="title-noto-2 my-1">
            {profil.email ? profil.email : "---------------"}
          </div>
          <div className="title-noto-2 my-1" style={{ color: "#666666" }}>
            {profil.profesi ? profil.profesi : "---------------"}
          </div>
        </div>

        <Link to="/profile/edit" className="no-style">
          <i
            className="material-icons align-self-center mx-4 d-none d-md-inline"
            style={{ cursor: "pointer" }}
          >
            border_color
          </i>
        </Link>
      </div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="galery">
        <Nav variant="pills" className="flex-row my-3">
          <Nav.Item className="col-12 col-md-6" style={{ cursor: "pointer" }}>
            <Nav.Link eventKey="history" className="text-center title-roboto-2">
              <i
                className="material-icons"
                style={{ verticalAlign: "bottom", fontSize: 30 }}
              >
                history
              </i>{" "}
              Activity
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="col-12 col-md-6" style={{ cursor: "pointer" }}>
            <Nav.Link eventKey="galery" className="text-center title-roboto-2">
              <i
                className="material-icons"
                style={{ verticalAlign: "bottom", fontSize: 30 }}
              >
                widgets
              </i>{" "}
              My Draft
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="history">
            <div className="row">
              <input
                type="text"
                placeholder="Search ....."
                className="shadow-3 rounded-3 p-3 card-search border-0 col-12 col-sm-7"
              ></input>
              <select
                className="shadow-3 rounded-3 p-3 card-search border-0 col-12 col-sm-4 ms-0 ms-sm-5 my-2 my-sm-0"
                aria-label=""
                value={filteredOrder}
                onChange={(evt) => setfilteredOrder(evt.target.value)}
              >
                <option value="myorder">Buying</option>
                <option value="mysell">Selling</option>
              </select>
            </div>
            <div className="table-responsive my-5">
              <table className="table table-striped">
                <thead className="">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrder == "myorder" ? loadOrder() : loadSell()}
                </tbody>
              </table>
            </div>
            {/* Modal Buying */}
            <Modal show={modalShow} onHide={() => setmodalShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title className="title-1">
                  Confirmation Order
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="title-2">
                  Make Sure that you have received your Orders from the Seller!
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={() => onConfirm("Finished")}>
                  Give Feedback
                </Button>
              </Modal.Footer>
            </Modal>
            {/* selling modal */}
            <Modal show={modalSell} onHide={() => setmodalSell(false)}>
              <Modal.Header closeButton>
                <Modal.Title className="title-1">Buying Order</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="title-2">
                  Hoolla, Got your Recent Order from :
                </div>
                <div className="mt-2">
                  Buyer`s name :{" "}
                  {dataModal.buyer ? dataModal.buyer : dataModal.buyer_id}
                </div>
                <div>Buyer`s Email : {dataModal.email}</div>
                <div>Order`s Date : {dataModal.createdAt}</div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={() => onConfirm("Confirmation")}
                >
                  Confirmed
                </Button>
              </Modal.Footer>
            </Modal>
          </Tab.Pane>
          <Tab.Pane eventKey="galery">
            <ProfileDraft />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      {/* Claimed Modal */}
      {/* <Modal show={modalShow} onHide={() => setmodalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="title-1">Claim Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="title-2">
            Make Sure that you have received your Orders from the Seller!
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onFeedback}>
            Give Feedback
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}
export default Profile;
