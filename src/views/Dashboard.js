import { Link, useNavigate } from "react-router-dom";
import {useState,useEffect} from "react"
import {useSelector} from "react-redux"

import {Spinner} from "react-bootstrap"
import Save from "../utils/save"
const ImageLoader =({photo})=>{
  if(photo == null){
    return (<div className="d-flex skeleton w-100" style={{height:150}}>
      <span className="m-auto title-2">Loading Image....</span>
    </div>)
  }else{
    return (
      <img className={"rounded "+(photo==null && "skeleton")} src={photo && "/assets/"+photo}></img>
    )
  }
}

const MarketCard = ({ product }) => {
  let navigate = useNavigate();
  const goTo = (url) => {
    navigate(url);
    // history.push("/item")
  };
  const sessionReducer = useSelector(
    (session) => session.ContractReducers
  );
  return (
    <div className="col-11 col-sm-5 mx-4 col-md-3 mb-5 rounded shadow-4 p-0 image-card d-flex flex-column justify-content-between">
      {/* <div className={"d-block " +(product.photo==null && "skeleton")}> */}
        <ImageLoader photo={product.photo}/>
       {/* <img className={"rounded "+(product.photo==null && "skeleton")} src={product.photo && "/assets/"+product.photo}></img> */}
      {/* </div> */}
      {/* <a className="d-block ripple-gray rounded shadow-3 overflow-hidden mb-2"><img className="img-fluid" src="https://assets.startbootstrap.com/img/screenshots-product-pages/material-admin-pro/dashboards/default.png" alt="..." /></a> */}
      <div className="d-flex flex-row p-3 justify-content-between">
        <div className="d-flex flex-column">
          <div className="title-2 text-line-1">{product.owner}</div>
          <div className="font-roboto text-line-3">{product.name}</div>
        </div>
        <div className="d-flex ms-1 flex-column text-end">
          <div className="font-roboto">Price</div>
          <div className={"font-noto fw-bold d-flex flex-row "+(sessionReducer.price==0 && "skeleton")}>
            {sessionReducer.price!=0 && (product.price/sessionReducer.price).toFixed(6)} 
            {sessionReducer.price!=0 && <img src="/assets/images/BNB.png" style={{height:30}}></img>}</div>
        </div>
      </div>
      <div
        className="px-3 py-2 font-noto fw-bold d-flex justify-content-center flex-row"
        style={{ color: "#018AD7", cursor: "pointer" }}
        onClick={() => goTo("/item/"+product.id)}
      >
        <span className="material-icons align-self-center">visibility</span>
        See More
      </div>
    </div>
  );
};

function Dashboard(prop) {
  let navigate = useNavigate();
  const [products, setproducts] = useState([])
  const contract = useSelector((state) => state.ContractReducers.contract.myContract);
  const goTo = (url) => {
    navigate(url);

    // history.push("/item")
  };
  useEffect(() => {

    const getProduct= async()=>{
      try {
        const productsData = await Save.get("/products");
       
        const product= productsData.slice(0,6);
        console.log(product)
        setproducts(product)
        if(contract){
          product.map(async (prod, index) => {
            console.log(prod.id)
            const detailProduct = await contract.productDetail(prod.id);
            console.log(detailProduct)
            // console.log(contract)
            const { id, name, owner, photo, price } =
              detailProduct;

              prod.price = price.toNumber();
              prod.photo = photo;
              prod.owner = owner;
              prod.name = prod.name;
           
            //   console.log(detailProduct);
            setproducts([...product]);
            // return {name,owner,photo,price:detailProduct.price.toNumber(),comment,rating : detailProduct.rating.toNumber()};
          });
    
        }
      } catch (error) {}
     
    }
    
      getProduct()
    
  }, [contract])
  const loadCard=()=>{
     return products.map((prod,index)=>{
      
       
       return <MarketCard key={prod.id} product={prod}/>
     })
  }
  return (
    <div className="container-xl p-5">
      {/* <div id="scrollTarget"></div> */}
      {/* <!-- Dashboard demos--> */}
      <div className="d-flex flex-row overflow-scroll py-5">
        <Link
          to="/sell"
          style={{ textDecoration: "none", color: "inherit" }}
          className="marketplace-card d-flex flex-column px-5"
        >
          <div className="d-block text-center">
            <object
              width="50"
              height="50"
              data="/assets/images//selling.svg"
            ></object>
          </div>
          <div className="text-center title-2"> Selling Item</div>
          <div className="text-center">
            Feel free register your own products and publiced it to everyone
          </div>
        </Link>
        <Link
          to="/profile"
          style={{ textDecoration: "none", color: "inherit" }}
          className="marketplace-card d-flex flex-column px-5"
        >
          <div className="d-block text-center">
            <object
              width="50"
              height="50"
              data="/assets/images//history.svg"
            ></object>
          </div>
          <div className="text-center title-2">Watch Your Histories</div>
          <div className="text-center">
            Lookup Your Activities Chronologically
          </div>
        </Link>
        <Link
          to="/market"
          style={{ textDecoration: "none", color: "inherit" }}
          className="marketplace-card d-flex flex-column"
        >
          <div className="d-block text-center">
            <object
              width="50"
              height="50"
              data="/assets/images//market.svg"
            ></object>
          </div>
          <div className="text-center title-2">Market Place</div>
          <div className="text-center">See what you like, then owned it</div>
        </Link>
      </div>

      <h1 className="mt-5 title-1"> Recently Added</h1>
      <hr className="mb-5 mt-0" />
      <div className="row gx-5 justify-content-center justify-content-sm-between">
        {loadCard()}
        
      </div>
      {products.length<=0 && <Spinner animation="border" size="lg" variant="primary" />}
      <Link
        to="/market"
        className="d-block text-center title-1"
        style={{ fontSize: 25, color: "#030083", textDecoration: "none" }}
      >
        {" "}
        View More
      </Link>
      {/* <!-- Page demos--> */}

      {/* <!-- Error page demos--> */}
    </div>
  );
}
export default Dashboard;
