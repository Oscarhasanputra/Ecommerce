import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Save from "../utils/save";
import { ConnectBlockchain } from "../utils/SmartContractCaller";
import { ethers } from "ethers";
import axios from "axios";
import Moment from "moment";
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
const CommentCard = ({ comment, person,date }) => {
  return (
    <div className="card my-3 shadow-sm" style={{ padding: 0 }}>
      <div className="card-header d-flex flex-row">
       
          <i
            className="material-icons mx-1"
            style={{ verticalAlign: "middle" }}
          >
            person
          </i>
          <div className="d-flex flex-column flex-md-row justify-content-md-between w-100">

          <span className="text-line-1 fw-bold">{person}</span>
            <div className="mt-2 mt-md-0">{Moment(date).fromNow()}</div>
          </div>
        
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
        // console.log(detailProduct)
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
          id,
        };

        Save.get("/product/" + id)
          .then((res) => {
            setproduct({
              ...dataProduct,
              rating: res.rating,
              txid: res.txid,
              comments: res.comments,
            });
            // console.log(res);
          })
          .catch((err) => {});

        setproduct(dataProduct);
      } catch (error) {
        //console.log(error);
      }
    };
    if (props.contract.myContract) getProduct();

    // Save.get("/comments",{data:{product_id:1231}}).then(res=>{
    // //console.log(res)
    // }).catch(err=>{

    // })
  }, [props.contract]);
  // //console.log(product);
  const onAddCart = async () => {
    const cart = props.cart;
    // //console.log(props.wallet)
    console.log(product);
    const data = {
      product_id: product.id,
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
      product_id: product.id,
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
    // console.log(product)
    if (product.comments) {
      const commentCard = product.comments.map((val, index) => {
        return (
          <CommentCard key={index} comment={val.text} person={val.user_id} date={val.createdAt}/>
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
  const goToChatRoom= ()=>{
    const ownerAddress = product.owner;
    axios.post("/checkRoom",{address:props.wallet,user_target:ownerAddress}).then(res=>{
      const room = res.data;
      const listOfChatContact = props.chatList;
      const contacts= props.chatContact
      if(!(listOfChatContact.includes(room.id))){
        room.chats = [];
        room.newChats = []
        props.addContact(room.id,room)
        props.addChat(room.id);
        
      }
      navigate("/chat/"+room.id)
      
    })
  }
  // //console.log(props.profil);
  return (
    <div className="container-xl p-5 row">
      <div className="col-12 col-md-5">
        {<ImageLoader photo={product.photo} />}

        <div className="d-flex flex-row justify-content-center">
          <a
            href={"https://testnet.bscscan.com/tx/" + product.txid}
            className="w-100 px-4 my-2 align-items-center text-center text-white btn-success btn-rounded shadow "
            style={{
              color: "#018AD7",
              cursor: "pointer",
              textDecoration: "none",
            }}
            // onClick={() => showModal}
            target="_blank"
          >
            Scan Data Blockchain
          </a>
        </div>
        {props.wallet && !(props.wallet == product.owner) && props.profil.name && (
          <div
            className="w-100 mt-3 py-2 px-5 text-white btn-primary btn-rounded shadow-lg text-center"
            style={{ color: "#018AD7", cursor: "pointer" }}
            onClick={() => showModal()}
          >
            Add To Cart
          </div>
        )}
        {props.wallet && !(props.wallet == product.owner) && props.profil.name && (
          <div
            className="w-100 mt-3 py-2 px-5 text-white btn-rounded shadow-lg text-center"
            style={{ color: "#018AD7", cursor: "pointer", background:"#6204af"}}
            onClick={() => goToChatRoom()}
          >
            Chat <i className="material-icons" style={{verticalAlign:"middle"}}>chat</i>
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

        {product.name && (
          <div className="title-1 text-center text-md-start">
            {product.name}
          </div>
        )}

        {product.name && (
          <div className="font-nato d-flex flex-column flex-sm-row justify-content-start">
            <div className="d-flex flex-row my-1">
              <span className="material-icons me-1">account_circle</span>{" "}
              <span className="text-line-1">{product.owner}</span>
            </div>

            {/* {product.owner && product.user.name} */}
            <div className="d-flex flex-row my-1">
              <span className="material-icons ms-sm-5 me-1">favorite</span>
              {product.rating}
            </div>
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
    chatList : state.ChatListReducers,
    chatContact : state.ChatReducers
  };
};
const dispatchToProps = (dispatch) => {
  return {
    add: (data) => dispatch({ type: "add", data }),
    delete: (index) => dispatch({ type: "delete", index }),
    updateContract: (contract) => dispatch({ type: "update", contract }),
    updateBalance: (price) => dispatch({ type: "balance", price }),
    addChat : (chatID)=>{
      dispatch({type:"addChat",key:chatID})
    },
    addContact : (chatID,contact)=>{
      dispatch({type:"addContact",key:chatID,contact})
    }
  };
};
export default connect(mapToProps, dispatchToProps)(Detail);
