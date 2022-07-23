import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Moment from "moment"
const CardNotif = ({ text, data, ...props }) => {
  const wallet = useSelector(
    (session) => session.ContractReducers.contract.wallet
  );
  const [profil, setprofil] = useState(
    data.order && data.order.buyer_id == wallet
      ? data.order.buyer_id
      : data.order && data.order.seller_id
  );
  const contract = useSelector(
    (session) => session.ContractReducers.contract.myContract
  );
  useEffect(() => {
    const getProfil = async () => {
     
      const { name } = await contract.wallets(profil);
      if (name) {
        setprofil(name);
      }
    };
    getProfil();
  }, []);

  return (
    <div className="card rounded-3 p-5 shadow my-5 btn-overlay">
      {(data.readStatus==null || (data.readStatus.search(wallet)<0)) && <span className="" style={{top:-20,left:10,maxWidth:"fit-content",padding:"10px 50px"}}>New</span>}
      <div className="d-flex flex-row justify-content-between">
        <div className="title-barlow-2">Info, {Moment(data.createdAt).fromNow()}</div>
        <div className="title-noto-2 fw-bold">
          {data.status}
          {/* 0.06581343
        <img src="/assets/images/BNB.png" style={{ height: 30 }}></img> */}
        </div>
      </div>
      <div className="title-barlow-1 my-2" style={{ fontSize: 22 }}>
        <i
          className="material-icons align-self-center me-1 text-primary"
          style={{ verticalAlign: "bottom" }}
        >
          account_circle
        </i>{" "}
        {profil}
      </div>
      <div className="d-flex row justify-content-between">
        <div className="title-roboto-1 col-12 col-md-8 mt-3 text-line-1" style={{ height: "auto",padding:1,lineHeight:1 }}>
          {text}
        </div>
        <Link to={"/order/" + data.order.id} className="btn btn-primary col-12 col-md-2 me-2 my-2 my-md-0 justify-content-center">
            Check
          </Link>
      </div>
    </div>
  );
};

function Notifications() {
  const wallet = useSelector(
    (session) => session.ContractReducers.contract.wallet
  );
  const [dataOrder, setdataOrder] = useState([])
    useEffect(()=>{
      if(wallet)
        axios.get("/myorder/all", {
            params: { user_id: wallet },
          }).then(res=>{
              
          const orderDetail = res.data;
          setdataOrder(orderDetail)
          });
    },[wallet])
  const loadNotification =() => {
    
    return dataOrder.map((val, index) => {
      const status = val.status;
     
      const text =
        status == "Waiting"
          ? "Succesfully sent the Order to Seller"
          : status == "Confirmation"
          ? "Confirmed the Order and has sent Email to " +
            val.order.email +
            " by Seller"
          : status == "Finished"
          ? "Order Successfully Accepted by buyer and Payment has been paid"
          : "Payment Fee has been Claimed by Seller";
      return <CardNotif data={val} key={index} text={text} />;
    });
  };
  return <div className="container-xl p-5">{loadNotification()}</div>;
}
export default Notifications;
