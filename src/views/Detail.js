import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Save from "../utils/save";
import { ConnectBlockchain } from "../utils/SmartContractCaller";
import { ethers } from "ethers";
import axios from "axios";
const ImageLoader = ({ photo }) => {
  if (photo == null) {
    return (
      <div className="d-flex skeleton" style={{ height: 300 }}>
        <span className="m-auto title-2">Image...</span>
      </div>
    );
  } else {
    return (
      <img
        className={
          "d-block image-rounded w-100 " + (photo == null && "skeleton")
        }
        src={photo && "/assets/" + photo}
      ></img>
    );
  }
};
const CommentCard = ({ comment, person }) => {
  return (
    <div className="card my-3 shadow-sm" style={{ padding: 0 }}>
      <div className="card-header">
        {" "}
        <i className="material-icons mx-1" style={{ verticalAlign: "middle" }}>
          person
        </i>
        {person}
      </div>
      <div className="card-body">{comment}</div>
    </div>
  );
};
function Detail(props) {
  const [show, setshow] = useState(false);
  const [email, setemail] = useState("");
  const [product, setproduct] = useState({});
  const [comment, setcomment] = useState("");
  const [dataComment, setdataComment] = useState([]);
  const showModal = () => {
    setshow(true);
  };
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getProduct = async () => {
      const contract = props.contract.myContract;
      try {
        const detailProduct = await contract.productDetail(id);
        const { category, description, name, owner, photo, price, productID } =
          detailProduct;

        const dataProduct = {
          category,
          comment,
          description,
          name,
          owner,
          price: price.toNumber(),
          photo,
          productID,
        };

        Save.get("/product/" + id)
          .then((res) => {
            setproduct({ ...dataProduct, rating: res.rating });
            // console.log(res);
          })
          .catch((err) => {});

        setproduct(dataProduct);
      } catch (error) {}
    };
    getProduct();
    axios
      .get("/comments", { params: { product_id: id } })
      .then((res) => {
        const dataComments = res.data.data;
        setdataComment(dataComments);
      })
      .catch((err) => {});
    // Save.get("/comments",{data:{product_id:1231}}).then(res=>{
    // console.log(res)
    // }).catch(err=>{

    // })
  }, []);
  // console.log(product);
  const onAddCart = async () => {
    const cart = props.cart;
    // console.log(props.wallet)
    const data = {
      product_id: product.productID.toNumber(),
      user_id: props.wallet,
      owner_id: product.owner,
    };

    setshow(false);
    Save.post("/cart", { data })
      .then((res) => {
        props.add(data);
      })
      .catch((err) => {
        props.delete(-1);
      });
  };
  const onComment = async () => {
    const contract = props.contract.myContract;
    const data = {
      text: comment,
      product_id: product.productID.toNumber(),
      user_id: props.wallet,
    };
    Save.post("/comments", { data })
      .then((res) => {
        navigate(0);
      })
      .catch((err) => {});
    // Loader.show();
    // await contract.addComments(comment, id);
    // Loader.hide();
    // navigate(0);
  };
  const loadCommentCard = () => {
    // const commentCard= [];
    if (product.comment) {
      const commentCard = dataComment.map((val, index) => {
        return (
          <CommentCard key={index} comment={val.text} person={val.user_id} />
        );
      });
      return commentCard;
    }
  };

  const connectWallet = () => {
    ConnectBlockchain(true)
      .then(async (contract) => {
        props.updateContract(contract);
        // props.updateContract(contract);

        localStorage.setItem("login", "true");
        const accountBalance = await contract.provider.getBalance(
          contract.wallet
        );
        const balance = ethers.utils.formatEther(accountBalance.toString());
        props.updateBalance(balance);
        // props.updateBalance(balance);
      })
      .catch((err) => {});
  };
  // console.log(props.profil);
  return (
    <div className="container-xl p-5 row">
      <div className="col-12 col-md-5">
        {<ImageLoader photo={product.photo} />}

        
        <div className="d-flex flex-row justify-content-center">
        <div
            className="w-100 px-4 my-2 align-items-center text-center text-white btn-success btn-rounded shadow "
            style={{ color: "#018AD7", cursor: "pointer" }}
            onClick={() => showModal}
          >

            Scan Data Blockchain
          </div>
        </div>
        {props.wallet && !(props.wallet == product.owner) && props.profil.name && (
          <div
            className="w-100 mt-3 py-2 px-5 text-white btn-primary btn-rounded shadow-lg text-center"
            style={{ color: "#018AD7", cursor: "pointer" }}
            onClick={() => showModal}
          >
            Add To Cart
          </div>
        )}
        {props.wallet && !props.profil.name && (
          <div
            className="w-100 mt-3 py-2 px-5 text-white btn-primary btn-rounded shadow-lg text-center"
            style={{ color: "#018AD7", cursor: "pointer" }}
            onClick={() => navigate("/profile/edit")}
          >
            Update Profil
          </div>
        )}
        {!props.wallet && (
          <div
            className="w-100 mt-3 py-2 px-5 text-white btn-primary btn-rounded shadow-lg text-center"
            style={{ color: "#018AD7", cursor: "pointer" }}
            onClick={() => connectWallet()}
          >
            Connect Wallet
          </div>
        )}
      </div>
      <div className="col-12 col-md-7 my-5 my-md-0 align-self-start">
        {!product.name && (
          <div
            className="mx-3 d-flex flex-column justify-content-between"
            style={{ flexGrow: 1 }}
          >
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
        )}

        {product.name && <div className="title-1">{product.name}</div>}

        {product.name && (
          <div className="font-nato d-flex">
            <span className="material-icons align-self-center me-1">
              account_circle
            </span>{" "}
            {product.owner}
            {/* {product.owner && product.user.name} */}
            <span className="material-icons align-self-center ms-5 me-1">
              favorite
            </span>{" "}
            {product.rating}
          </div>
        )}
        {product.name && (
          <div className="d-flex flex-row">
            <img
              src="/assets/images/BNB.png"
              className="align-self-center"
              style={{ height: 30 }}
            ></img>
            <div className="title-2 my-2">
              {(product.price / props.priceBNB).toFixed(6)}{" "}
            </div>
          </div>
        )}

        <div className="card my-3 shadow-sm">
          <div className="card-header">Description</div>
          {!product.description && (
            <div
              className="mx-3 my-3 d-flex flex-column justify-content-between"
              style={{ flexGrow: 1 }}
            >
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
          )}
          {product.description && (
            <div className="card-body">{product.description}</div>
          )}
        </div>

        {/* comment card */}

        {/* <<<< Comment Card */}
      </div>
      <div
        className="py-2 px-4 my-4 card-comment shadow-lg d-flex flex-row"
        style={{ backgroundColor: "white" }}
      >
        <div className="circle-outlined align-self-center me-3 ">
          <i className="material-icons" style={{ verticalAlign: "middle" }}>
            person
          </i>
        </div>
        <input
          className="form-control"
          style={{ borderWidth: 0 }}
          placeholder="Add Comments...."
          value={comment}
          onChange={(evt) => setcomment(evt.target.value)}
        ></input>
        <span
          className="mx-2 align-self-center"
          style={{ cursor: "pointer", color: "#0d0074" }}
          onClick={onComment}
        >
          Send
        </span>
      </div>
      {loadCommentCard()}
      <Modal show={show} onHide={() => setshow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure Add "{product.name}" to Cart?</Modal.Title>
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
          <Button variant="primary" onClick={onAddCart}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
const mapToProps = (state) => {
  return {
    contract: state.ContractReducers.contract,
    wallet: state.ContractReducers.contract.wallet,
    priceBNB: state.ContractReducers.price,
    profil: state.ContractReducers.contract.profil,
    cart: state.CartReducers,
  };
};
const dispatchToProps = (dispatch) => {
  return {
    add: (data) => dispatch({ type: "add", data }),
    delete: (index) => dispatch({ type: "delete", index }),
    updateContract: (contract) => dispatch({ type: "update", contract }),
    updateBalance: (price) => dispatch({ type: "balance", price }),
  };
};
export default connect(mapToProps, dispatchToProps)(Detail);
