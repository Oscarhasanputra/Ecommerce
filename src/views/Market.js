import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Save from "../utils/save";
import {Spinner} from "react-bootstrap"
import { ConnectBlockchain } from "../utils/SmartContractCaller";
const ImageLoader = ({ photo, productID }) => {
  const navigate = useNavigate();
  if (photo == null) {
    return (
      <div className="d-flex skeleton w-100" style={{ height: 250 }}>
        <span className="m-auto title-2">Loading Image....</span>
      </div>
    );
  } else {
    return (
      <img
        className={"d-block rounded " + (photo == null && "skeleton")}
        src={photo && "/assets/" + photo}
        style={{ height: 250 }}
        onClick={() => {
          navigate("/item/" + productID);
        }}
      ></img>
    );
  }
};

const MarketProduct = ({ showModal, product }) => {
  const navigate = useNavigate();
  const [refresh, setrefresh] = useState("");
  const [products, setproducts] = useState(product);

  const dispatch = useDispatch();
  const wallet = useSelector(
    (session) => session.ContractReducers.contract.wallet
  );
  const profil = useSelector(
    (session) => session.ContractReducers.contract.profil
  );
  const contract = useSelector(
    (session) => session.ContractReducers.contract.myContract
  );
  const sessionReducer = useSelector((session) => session.ContractReducers);
  // console.log(product)
  useEffect(() => {
    const getDetailContract= async ()=>{
      const detailProduct = await contract.productDetail(products.id);
            
      if (detailProduct) {
        const { productID, name, owner, photo, price, category } =
          detailProduct;

        products.name = name;
        products.owner = owner;
        products.photo = photo;
        products.category = category;
        products.price = price.toNumber();
        
        setproducts(products);
      }
    }
    getDetailContract()
  }, []);

  const favorite = () => {
    Save.post("/product/" + product.id)
      .then((res) => {
        products.rating += 1;

        setproducts({ ...products });
      })
      .catch((err) => {});
  };
  const connectWallet = () => {
    ConnectBlockchain(true)
      .then(async (contract) => {
        dispatch({ type: "update", contract });
        // props.updateContract(contract);

        localStorage.setItem("login", "true");
        const accountBalance = await contract.provider.getBalance(
          contract.wallet
        );
        const balance = ethers.utils.formatEther(accountBalance.toString());
        dispatch({ type: "balance", price: balance });
        // props.updateBalance(balance);
      })
      .catch((err) => {});
  };
  return (
    <div className="col-10 mx-2 mx-md-4 col-sm-5 col-md-3 mb-5 rounded shadow-4 p-0 image-card">
      <ImageLoader photo={products.photo} productID={products.id} />
      {/* <img
        className="d-block rounded"
        src={"/assets/" + products.photo}
        onClick={() => {
          navigate("/item/" + products.id);
        }}
      ></img> */}
      {/* <a className="d-block ripple-gray rounded shadow-3 overflow-hidden mb-2"><img className="img-fluid" src="https://assets.startbootstrap.com/img/screenshots-product-pages/material-admin-pro/dashboards/default.png" alt="..." /></a> */}
      <div className="d-flex flex-column p-3">
        <div className="font-roboto text-line-3 title-barlow-1">
          {products.name}{" "}
        </div>
        <div className="d-flex flex-row justify-content-between">
          <div className="font-noto fw-bold title-noto-2">
            {(products.price / sessionReducer.price).toFixed(6)}{" "}
            <img src="/assets/images/BNB.png" style={{ height: 30 }}></img>
          </div>

          <div className="title-noto-2" style={{ fontSize: 18 }}>
            {products.category}
          </div>
        </div>
        <div className="d-flex flex-row mt-4">
          <i className="material-icons">person</i>
          <div className="title-barlow-2 fw-bold text-line-1">
            {products.owner}
          </div>
        </div>
      </div>
      <div className="px-3 py-2 d-flex justify-content-between flex-row">
        {/* {products.owner == wallet ? (
          <div
            className="px-3 py-2 font-noto fw-bold d-flex justify-content-center flex-row"
            style={{ color: "#018AD7", cursor: "pointer" }}
            onClick={() => navigate("/item/" + product.id)}
          >
            <span className="material-icons align-self-center">visibility</span>
            See More
          </div>
        ) : ( */}
        {wallet && profil.name && (
          <div
            className="font-noto fw-bold"
            style={{ color: "#018AD7", cursor: "pointer" }}
            onClick={() => showModal(products)}
          >
            Add To Cart
          </div>
        )}
        {wallet && !profil.name && (
          <div
            className="font-noto fw-bold"
            style={{ color: "#018AD7", cursor: "pointer" }}
            onClick={() => navigate("/profile/edit")}
          >
            Update Profil
          </div>
        )}
        {!wallet && (
          <div
            className="font-noto fw-bold"
            style={{ color: "#018AD7", cursor: "pointer" }}
            onClick={() => connectWallet()}
          >
            Connect Wallet
          </div>
        )}
        {/* )} */}
        <div
          className="d-flex "
          style={{ cursor: "pointer" }}
          onClick={favorite}
        >
          <span className="material-icons">favorite_border</span>
          <span className="font-roboto"> {products.rating} </span>
        </div>
      </div>
    </div>
  );
};

const MarketProduct2 = ({ showModal, product }) => {
  const navigate = useNavigate();
  const [refresh, setrefresh] = useState("");

  const [products, setproducts] = useState(product);
  const dispatch = useDispatch();
  const wallet = useSelector(
    (session) => session.ContractReducers.contract.wallet
  );
  const profil = useSelector(
    (session) => session.ContractReducers.contract.profil
  );
  const contract = useSelector(
    (session) => session.ContractReducers.contract.myContract
  );
  const sessionReducer = useSelector((session) => session.ContractReducers);
  useEffect(() => {
    const getDetailContract= async ()=>{
      const detailProduct = await contract.productDetail(products.id);
            
      if (detailProduct) {
        const { productID, name, owner, photo, price, category } =
          detailProduct;

        products.name = name;
        products.owner = owner;
        products.photo = photo;
        products.category = category;
        products.price = price.toNumber();
        
        setproducts(products);
      }
    }
    getDetailContract()
    
    // Save.get("/product/" + product.id).then((res) => {
    //   product = { ...product, rating: res.rating };
    //   setproducts(product);
    // });
  }, []);

  const favorite = () => {
    Save.post("/product/" + product.id)
      .then((res) => {
        products.rating += 1;
        setproducts({ ...products });
      })
      .catch((err) => {});
  };

  const connectWallet = () => {
    ConnectBlockchain(true)
      .then(async (contract) => {
        dispatch({ type: "update", contract });
        // props.updateContract(contract);

        localStorage.setItem("login", "true");
        const accountBalance = await contract.provider.getBalance(
          contract.wallet
        );
        const balance = ethers.utils.formatEther(accountBalance.toString());
        dispatch({ type: "balance", price: balance });
        // props.updateBalance(balance);
      })
      .catch((err) => {});
  };

  return (
    <div className="col-10 mx-2 mx-md-4 col-sm-5 mb-5 rounded shadow-4 p-0 image-card">
      <ImageLoader photo={products.photo} productID={products.id} />
      {/* <img
        className="d-block rounded"
        src={"/assets/" + products.photo}
        style={{ height: 250 }}
        onClick={() => {
          navigate("/item/" + products.id);
        }}
      ></img> */}
      {/* <a className="d-block ripple-gray rounded shadow-3 overflow-hidden mb-2"><img className="img-fluid" src="https://assets.startbootstrap.com/img/screenshots-product-pages/material-admin-pro/dashboards/default.png" alt="..." /></a> */}
      <div className="d-flex flex-column p-3 ">
        <div className="font-roboto text-line-3 title-barlow-1">
          {products.name}{" "}
        </div>

        <div className="d-flex flex-row justify-content-between">
          <div className="font-noto fw-bold title-noto-2">
            {(products.price / sessionReducer.price).toFixed(6)}{" "}
            <img src="/assets/images/BNB.png" style={{ height: 30 }}></img>
          </div>

          <div className="title-noto-2" style={{ fontSize: 18 }}>
            {products.category}
          </div>
        </div>

        <div className="d-flex flex-row mt-4">
          <i className="material-icons">person</i>
          <div className="title-barlow-2 fw-bold text-line-1">
            {products.owner}
          </div>
        </div>
      </div>
      <div className="px-3 py-2 d-flex justify-content-between flex-row">
        {wallet && profil.name && (
          <div
            className="font-noto fw-bold"
            style={{ color: "#018AD7", cursor: "pointer" }}
            onClick={() => showModal(products)}
          >
            Add To Cart
          </div>
        )}
        {wallet && !profil.name && (
          <div
            className="font-noto fw-bold"
            style={{ color: "#018AD7", cursor: "pointer" }}
            onClick={() => navigate("/profile/edit")}
          >
            Update Profil
          </div>
        )}
        {!wallet && (
          <div
            className="font-noto fw-bold"
            style={{ color: "#018AD7", cursor: "pointer" }}
            onClick={() => connectWallet()}
          >
            Connect Wallet
          </div>
        )}
        {/* )} */}

        <div
          className="d-flex "
          style={{ cursor: "pointer" }}
          onClick={favorite}
        >
          <span className="material-icons">favorite_border</span>
          <span className="font-roboto"> {products.rating} </span>
        </div>
      </div>
    </div>
  );
};

function Market(props) {
  const [show, setshow] = useState(false);
  const [statusData, setstatusData] = useState(false);
  const [dataModal, setdataModal] = useState({});
  const [dataProduct, setdataProduct] = useState([]);
  const [filtered, setfiltered] = useState("id,desc");
  const [search, setsearch] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const itemPerPage = 5;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const testdataProduct = [];
        const products = await Save.get("/products", {
          owner: props.wallet,
          filter: filtered,
          search,
        });
        setdataProduct(products);
        if (props.contract) {
          const contract = props.contract;
          
          products.map(async (prod, index) => {
            const detailProduct = await contract.productDetail(prod.id);
            
            if (detailProduct) {
              const { productID, name, owner, photo, price, category } =
                detailProduct;

              prod.name = name;
              prod.owner = owner;
              prod.photo = photo;
              prod.category = category;
              prod.price = price.toNumber();
              
              setdataProduct([...products]);
            }
          });
        }
        // setstatusData(true)
      } catch (error) {}
    };
    getProduct();

    // Save.get("/products").then((res) => {
    //   setdataProduct(res.dataProduct);
    // });
  }, [props.wallet, filtered, search, props.contract]);
  const navigate = useNavigate();

  const loadProduct = () => {
    const cards = [];
    const perRowCount = 5;
    const startIndex = (currentPage - 1) * itemPerPage;
    const productsLoaded = dataProduct.slice(
      startIndex,
      startIndex + itemPerPage
    );
    const maxCount = Math.floor(productsLoaded.length / perRowCount);
    // console.log(maxCount);
    for (let i = 0; i < maxCount; i++) {
      const start = i * perRowCount;
      cards.push(
        <MarketProduct2
          key={productsLoaded[start].id}
          product={productsLoaded[start + 0]}
          showModal={showModal}
        ></MarketProduct2>
      );

      cards.push(
        <MarketProduct2
          key={productsLoaded[start + 1].id}
          product={productsLoaded[start + 1]}
          showModal={showModal}
        ></MarketProduct2>
      );
      cards.push(
        <MarketProduct
          key={productsLoaded[start + 2].id}
          product={productsLoaded[start + 2]}
          showModal={showModal}
        ></MarketProduct>
      );

      cards.push(
        <MarketProduct
          key={productsLoaded[start + 3].id}
          product={productsLoaded[start + 3]}
          showModal={showModal}
        ></MarketProduct>
      );

      cards.push(
        <MarketProduct
          key={productsLoaded[start + 4].id}
          product={productsLoaded[start + 4]}
          showModal={showModal}
        ></MarketProduct>
      );
    }
    for (let i = perRowCount * maxCount; i < productsLoaded.length; i++) {
      
      cards.push(
        <MarketProduct
          key={productsLoaded[i].id + i}
          product={productsLoaded[i]}
          showModal={showModal}
        ></MarketProduct>
      );
    }

    return cards;
  };
  const goTo = (url) => {
    navigate(url);
  };
  // const [show,setShow]=
  // const [show,setShow]=
  const showModal = (data) => {
    setdataModal(data);
    setshow(true);
  };
  const onAddCart = async () => {
    const cart = props.cart;
    // console.log(props.wallet)
    const data = {
      product_id: dataModal.id,
      user_id: props.wallet,
      owner_id: dataModal.owner,
    };

    setshow(false);
    Save.post("/cart", { data })
      .then((res) => {
        props.add(res.cartItem);
      })
      .catch((err) => {
        props.delete(-1);
      });
  };

  const loadNavigation = () => {
    const lastPage = Math.ceil(dataProduct.length / itemPerPage);
    const liItems = [];
    liItems.push(
      <li
        onClick={() => {
          if (currentPage - 1 >= 1) {
            setcurrentPage(currentPage - 1);
          }
        }}
        key="previous"
        className={"page-item " + (currentPage == 1 && "disabled")}
      >
        <span className="page-link">Previous</span>
      </li>
    );
    for (
      let i = currentPage - 3 >= 1 ? currentPage - 3 : 1;
      i <= (currentPage + 3 <= lastPage ? currentPage + 3 : lastPage);
      i++
    ) {
      liItems.push(
        <li
          onClick={() => {
            setcurrentPage(i);
          }}
          className={"page-item " + (i == currentPage && "active")}
          key={i}
        >
          <a className={"page-link "}>{i}</a>
        </li>
      );
    }

    liItems.push(
      <li
        onClick={() => {
          if (currentPage + 1 <= lastPage) setcurrentPage(currentPage + 1);
        }}
        key="next"
        className={"page-item " + (currentPage == lastPage && "disabled")}
      >
        <a className="page-link">Next</a>
      </li>
    );

    return liItems;
  };

  return (
    <div className="container-xl p-5">
      <input
        type="text"
        placeholder="Search ....."
        className="shadow-3 rounded-3 p-3 card-search border-0 col-12 col-md-7 my-2"
        value={search}
        onChange={(e) => {
          e.preventDefault();
          setsearch(e.target.value);
        }}
      ></input>
      <select
        className="shadow-3 rounded-3 p-3 card-search border-0 col-12 col-md-4 ms-md-5 my-2"
        aria-label=""
        value={filtered}
        onChange={(e) => {
          setfiltered(e.target.value);
        }}
      >
        <option value="id,desc">Newest</option>
        <option value="id,asc">Oldest</option>
        <option value="price,asc">Lowest Price</option>
        <option value="price,desc">Highest Price</option>
        <option value="rating,asc">Lowest Rating</option>
        <option value="rating,desc">Highest Rating</option>
      </select>
      <div className="row justify-content-center mt-5">
        {/* <MarketProduct2 showModal={showModal}></MarketProduct2>
        <MarketProduct2 showModal={showModal}></MarketProduct2>
        <MarketProduct showModal={showModal}></MarketProduct>
        <MarketProduct showModal={showModal}></MarketProduct>
        <MarketProduct showModal={showModal}></MarketProduct> */}
        {loadProduct()}
        {dataProduct.length<=0 && <Spinner animation="border" size="lg" variant="primary" />}
        {dataProduct.length>0 && <nav className="">
          <ul className="pagination pagination-lg justify-content-center">
            {loadNavigation()}
            {/* <li class="page-item">
              <a class="page-link" href="#">
                1
              </a>
            </li>
            <li class="page-item active" aria-current="page">
              <span class="page-link">2</span>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                3
              </a>
            </li> */}
          </ul>
        </nav>}
      </div>
      <Modal show={show} onHide={() => setshow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Are You Sure Add "{dataModal.name}" to Cart?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="input-group mb-3">
            <input
              title="Email "
              type="text"
              className="form-control required"
              placeholder="Enter Your Email"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={email}
              onChange={(evt) => setemail(evt.target.value)}
            />
          </div> */}
        </Modal.Body>
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
    contract: state.ContractReducers.contract.myContract,
    wallet: state.ContractReducers.contract.wallet,
    cart: state.CartReducers,
  };
};
const dispatchToProps = (dispatch) => {
  return {
    add: (data) => dispatch({ type: "add", data }),
    delete: (index) => dispatch({ type: "delete", index }),
    logout: () => dispatch({ type: "update", date: 0 }),
  };
};
export default connect(mapToProps, dispatchToProps)(Market);
