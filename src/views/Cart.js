import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import axios from "axios";
import Save from "../utils/save";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";
import { Loader } from "../utils/loader";

const ImageLoader = ({ photo }) => {
  if (photo == null) {
    return (
      <div className="d-flex skeleton" style={{ height: 200, width: 200 }}>
        <span className="m-auto title-2">Image...</span>
      </div>
    );
  } else {
    return (
      <img
        className={"col-8 col-md-3 img-cart" + (photo == null && "skeleton")}
        src={photo && "/assets/" + photo}
      ></img>
    );
  }
};
const CardCart = ({ emailChange, cartItem, ...props }) => {
  const contractReducer = useSelector(
    (session) => session.ContractReducers.contract
  );
  const navigate = useNavigate();
  const [cartData, setcartData] = useState(cartItem);
  const priceBNB = useSelector((session) => session.ContractReducers.price);
  useEffect(() => {
    const getDetailProduct = async () => {
      const contract = contractReducer.myContract;
      const product_id = cartItem.product_id;
      const wallet = contractReducer.wallet;
      const dataProduct = await contract.productDetail(product_id);
      const profil = await contract.wallets(wallet);
      const data = {
        ...cartData,
        email: profil.email,
        name: dataProduct.name,
        photo: dataProduct.photo,
        price: dataProduct.price.toNumber(),
        category: dataProduct.category,
      };
      emailChange(profil.email, data.price);
      setcartData(data);
      Save.get("/product/" + product_id)
        .then((res) => {
          setcartData({ ...data, rating: res.rating });
        })
        .catch((err) => {});
    };
    if (contractReducer) getDetailProduct();
  }, [contractReducer]);
  const onChangeEmail = () => {
    Swal.fire({
      title: "Change Your Email Here!",
      html: `<input type="text" id="email" class="swal2-input" placeholder="Username">`,
      confirmButtonText: "Change it",
      focusConfirm: false,
      preConfirm: () => {
        const email = Swal.getPopup().querySelector("#email").value;
        var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!pattern.test(email))
          Swal.showValidationMessage(`Invalid Format Email`);
        return { email };
      },
    }).then((result) => {
      const email = result.value && result.value.email;
      setcartData({ ...cartData, email });
      emailChange(email, cartData.price);
    });
  };
  const onDelete = (id) => {
    Swal.fire({
      title: "Do you want to delete this item?",
      showDenyButton: true,
      confirmButtonText: "Yass",
      denyButtonText: `Nope`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Save.delete("/cart", { data: [id] })
          .then((res) => {
            navigate(0);
          })
          .catch((err) => {});
      }
    });
  };
  const onValidateEmailStr = (emailStr) => {
    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return pattern.test(emailStr);
  };
  return (
    <div className=" p-4 d-flex flex-column shadow-lg my-5 corner-rounded-20 bg-white position-relative">
      <div
        className="d-flex flex-row shadow-lg corner-rounded-50 text-white px-4"
        style={{
          position: "absolute",
          width: "80%",
          top: -30,
          left: 20,
          overflow: "hidden",
          backgroundColor: "#330270",
        }}
      >
        <span className="material-icons align-self-center mx-2">
          account_circle
        </span>
        <span className="title-roboto-1 my-2"> {cartData.owner_id}</span>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between mt-2">
        <ImageLoader photo={cartData.photo} />

        <div className="col-12 ms-2 col-md-7 d-flex flex-column">
          {!cartData.name && (
            <div
              className="mx-3 d-flex flex-column justify-content-between my-2"
              style={{ flexGrow: 1 }}
            >
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
          )}
          {cartData.name && (
            <div className="d-flex flex-row justify-content-between">
              <div className="title-1 col-10" style={{ fontWeight: 500 }}>
                {cartData.name}
              </div>
              <div className="col-2 d-flex flex-row justify-content-center align-items-center">
                <span className="material-icons" style={{ color: "#ff29e2" }}>
                  favorite
                </span>
                <span className="title-2">{cartData.rating}</span>
              </div>
            </div>
          )}
          {cartData.category && (
            <div className="title-noto-2 mt-2">{cartData.category}</div>
          )}
          {cartData.price > 0 && (
            <div className="title-2 my-2">
              {(cartData.price / priceBNB).toFixed(8)}{" "}
              <img
                src="/assets/images/BNB.png"
                style={{ height: 30, verticalAlign: "top" }}
              />
            </div>
          )}

          <div className="d-flex flex-row align-items-center">
            <span className="material-icons">forward_to_inbox</span>
            <div
              className={
                "mx-2 title-noto-2 col-8 col-md-7 text-line-1 " +
                (onValidateEmailStr(cartData.email) ? "" : "text-danger")
              }
            >
              {onValidateEmailStr(cartData.email)
                ? cartData.email
                : "Invalid Email Format"}
            </div>
            <div className="w-100 d-flex flex-row justify-content-end">
              <div className="btn btn-primary">
                <span
                  className="material-icons mx-1 d-inline d-md-none "
                  style={{ color: "white" }}
                >
                  edit
                </span>
                <span className="d-none d-md-inline" onClick={onChangeEmail}>
                  Change Email
                </span>
              </div>
            </div>
          </div>

          <div
            className="corner-rounded-50 fw-bolder btn btn-danger mt-3 py-2 justify-content-center align-self-center text-center"
            style={{ width: "90%" }}
            onClick={() => onDelete(cartData.id)}
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};
const Cart = (props) => {
  const cartReducer = useSelector((session) => session.CartReducers);
  const wallet = useSelector(
    (session) => session.ContractReducers.contract.wallet
  );
  const contract = useSelector(
    (session) => session.ContractReducers.contract.myContract
  );
  const priceBNB = useSelector((session) => session.ContractReducers.price);
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const loadCartItem = () => {
    const cards = cartReducer.map((cartItem, index) => {
      return (
        <CardCart
          cartItem={cartItem}
          key={index}
          emailChange={(email, price) => {
            cartItem.email = email;
            cartItem.price = price;
            // cartItem={...cartItem,email:email};
          }}
        />
      );
    });
    return cards;
  };

  const onCheckOut = async () => {
    const dataCartSaved = [];
    // const dataCartSaved = cartReducer.map((cart, index) => {
    //   return {
    // buyer_id: wallet,
    // seller_id: cart.owner_id,
    // product_id: cart.product_id,
    // email: cart.email,
    //   };
    // });

    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    for (let i = 0; i < cartReducer.length; i++) {
      const dataCart = cartReducer[i];
      if (pattern.test(dataCart.email)) {
        const destAddr = dataCart.owner_id;
        // try {
        Loader.show("Initializing Wallet for Confirmation....");
        const feeProduct = (dataCart.price / priceBNB).toFixed(8);
        const tx = await contract.receive(destAddr, {
          value: ethers.utils.parseUnits(feeProduct.toString(), "ether"),
        });
        const gasLimit = tx.gasLimit.toNumber();
        const gasPrice = ethers.utils.formatEther(tx.gasPrice.toNumber());
        const totalFee = (gasLimit * gasPrice).toFixed(8);

        dataCartSaved.push({
          buyer_id: wallet,
          seller_id: destAddr,
          product_id: dataCart.product_id,
          email: dataCart.email,
          gas: totalFee,
          price: feeProduct,
          txid: tx.hash,
        });
      } else {
        Swal.fire({
          title: "Invalid Format Email",
          text: "Please Fill Email Correctly",
          icon: "error",
          timer: 1000,
        });

        return;
      }
    }
    Loader.hide();
    const idCartsDelete = cartReducer.map((cart) => cart.id);

    // const test= [...cartReducer.id];

    axios
      .delete("/cart", { data: idCartsDelete })
      .then((res) => {})
      .catch((err) => {});

    Save.post("/product/checkout", dataCartSaved)
      .then(async (res) => {
        // dataCartSaved.map((val,index)=>{

        // })
        navigate(0);
      })
      .catch((err) => {
        navigate(0);
      });
    // Save.post("/order/checkout",)
  };
  return (
    <div className="container d-flex flex-column">
      {loadCartItem()}
      {cartReducer.length <= 0 && (
        <div className="d-flex flex-column align-items-center justify-content-center title-1">
          <i
            className="material-icons align-self-center mx-2 text-danger"
            style={{ fontSize: 100 }}
          >
            remove_shopping_cart
          </i>
          <div className="title-1 ">Cart is Empty</div>
        </div>
      )}
      {cartReducer.length > 0 && (
        <div
          onClick={() => setshow(true)}
          className="d-flex flex-row justify-content-end btn btn-success align-self-end"
        >
          {" "}
          Checkout{" "}
        </div>
      )}
      <Modal show={show} onHide={() => setshow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure Checkout All Products?</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button
            className="mx-2"
            variant="danger"
            onClick={() => setshow(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={onCheckOut}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Cart;
