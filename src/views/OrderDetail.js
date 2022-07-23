import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "../utils/loader";
import { Spinner } from "react-bootstrap";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import Save from "../utils/save";
import axios from "axios";
const ImageLoader = ({ photo }) => {
  if (photo == null) {
    return (
      <div className="d-flex skeleton" style={{ height: 100, width: 100 }}>
        <span className="m-auto title-2">Image...</span>
      </div>
    );
  } else {
    return (
      <img
        className={"d-block rounded " + (photo == null && "skeleton")}
        src={photo && "/assets/" + photo}
        style={{ height: 100, width: 100 }}
      ></img>
    );
  }
};
const HistoryCard = ({ text, date, status, txid }) => {
  const getColor = () => {
    return (
      "hsl(" +
      360 * Math.random() +
      "," +
      (25 + 70 * Math.random()) +
      "%," +
      (80 + 10 * Math.random()) +
      "%)"
    );
  };
  const color = getColor();
  return (
    <div
      className="card p-3 my-3 flex-row"
      style={{
        boxShadow: "3px 2px 10px " + color,
      }}
    >
      <span
        className="align-self-center rounded-circle p-3 text-uppercased title-2"
        style={{ backgroundColor: color }}
      >
        {" "}
        TX{" "}
      </span>
      <div className="d-flex flex-column justify-content-center">
        <div className="font-noto text-line-3">{text}</div>
        <div className="text-muted my-1">{date}</div>
      </div>
      {(status == "Waiting" || status == "Claimed" || status == "Refund") && (
        <a
          href={"https://testnet.bscscan.com/tx/" + txid}
          target="_blank"
          className="align-self-center ms-auto"
        >
          <i className="material-icons" style={{ fontSize: 45 }}>
            document_scanner
          </i>
        </a>
      )}
    </div>
  );
};

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const session = useSelector((state) => state.ContractReducers.contract);

  const [order, setorder] = useState({});
  const [detail, setdetail] = useState({});
  useEffect(() => {
    const wallet = session.wallet;
    const contract = session.myContract;

    if (session.wallet) {
      axios
        .get("/order/" + id, { params: { user_id: wallet } })
        .then((res) => {
          // const dataOrder = res.data.myorder[0];

          // //console.log("hello")

          const dataOrder = res.data[0];
          // //console.log("panggil1")
          // const [{...readStatus}] = detailOrderUpdate;
          //update reading status order detail
          try {
            const detailOrderUpdate = dataOrder.orders_details
              .filter((val, index) => {
                return (
                  val.readStatus == null || val.readStatus.indexOf(wallet) < 0
                );
              })
              .map((val, index) => {
                return {
                  readStatus: `${val.readStatus},${wallet}`,
                  id: val.id,
                };
              });
            if (detailOrderUpdate.length > 0) {
              axios
                .post("/orderDetail/read", { data: detailOrderUpdate })
                .then((res) => {})
                .catch((err) => {});
            }
          } catch (error) {
            //console.log(error);
          }

          const productID = dataOrder.product_id;

          contract
            .productDetail(productID)
            .then(async (data) => {
              // //console.log(data);
              // //console.log(data);
              const { photo, name, owner, category } = data;
              const seller = await contract.wallets(owner);
              const sellerDetail = seller.name ? seller.name : owner;

              setdetail({
                photo,
                name,
                owner,
                category,
                price: data.price.toNumber(),
                seller: sellerDetail,
              });
            })
            .catch((err) => {});
          // //console.log(dataOrder);
          setorder(dataOrder);
        })
        .catch((err) => {});
    }
  }, [id, session]);

  const loadHistory = () => {
    const orderDetail = order.orders_details ? order.orders_details : [];

    return orderDetail.map((detail, index) => {
      const { status, txid } = detail;
      const text =
        status == "Waiting"
          ? "Succesfully sent the Order to Seller"
          : status == "Confirmation"
          ? "Confirmed the Order and has sent Email to " +
            order.email +
            " by Seller"
          : status == "Finished"
          ? "Order Successfully Accepted by buyer and Payment has been paid"
          : status == "Refund"
          ? "Refund Payment by Buyer"
          : "Payment Fee has been Claimed by Seller";
      return (
        <HistoryCard
          key={index}
          text={text}
          date={detail.createdAt}
          status={status}
          txid={txid}
        />
      );
    });
  };
  const onConfirm = (status) => {
    Save.post("/order/confirm", { id: order.id, status })
      .then((res) => {
        Loader.hide();
        navigate(0);
      })
      .catch((err) => {
        Loader.hide();
        navigate(0);
      });
  };
  const calculateDays = (dateOrder) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(dateOrder);
    const secondDate = new Date();

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
  };
  const refund = (price) => {
    // //console.log(order)
    const contract = session.myContract;
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
  const onClaim = async (price) => {
    const contract = session.myContract;
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
        Loader.show("Initializing Wallet for Confirmation....");
        const tx = await contract.withdraw(weiPriceStr);

        Loader.show(" Claim Saldo to your Wallet...");
        await tx.wait();
        const gasLimit = tx.gasLimit.toNumber();
        const gasPrice = ethers.utils.formatEther(tx.gasPrice.toNumber());
        const totalFee = (gasLimit * gasPrice).toFixed(8);
        Save.post("/order/confirm", {
          id: order.id,
          status: "Claimed",
          gas: totalFee,
          txid: tx.hash,
        })
          .then((res) => {
            Loader.hide();
            navigate(0);
          })
          .catch((err) => {
            Loader.hide();
            navigate(0);
          });
      }
    });
  };
  const totalGas = order.orders_details && order.orders_details.reduce((a, b) => {
    return { gas: a.gas + b.gas };
  }).gas ;

  return (
    <div className="container-xl p-5">
      <div className="card rounded-3 shadow-sm p-4">
        <div className="d-flex flex-column flex-sm-row justify-content-between">
          <div className="title-2 my-2">No. Order : {id}</div>
          <div className="title-2 my-2">Status : {order.status}</div>
        </div>
        <div className="title-2 my-2 text-line-1">
          Invoice No :
          <span className="title-2 text-line-1">
            {session.wallet}
            {id}
          </span>
        </div>
        <div className="d-flex flex-column justify-content-center justify-content-sm-start flex-sm-row mt-4">
          <div className="p-2 rounded order-image align-self-center mb-4">
            <ImageLoader photo={detail.photo} />
            {/* <img
              src={"/assets/" + detail.photo}
              height="100"
              width="100"
              className="rounded"
            ></img> */}
          </div>
          {!detail.name && (
            <div
              className="mx-3 d-flex flex-column justify-content-between"
              style={{ flexGrow: 1 }}
            >
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
          )}

          {detail.name && (
            <div className="mx-3 d-flex flex-column justify-content-between">
              <div className="title-2 text-center text-sm-start">
                {detail.name}
              </div>

              <div className="d-flex flex-column mt-2 flex-sm-row justify-content-between">
                <div className="align-self-center">Qty : 1</div>
                <div className="align-self-center">
                  Price : <span className="d-inline-block">{order.price} </span>
                  <img src="/assets/images/BNB.png" height="30" />
                </div>
              </div>

              <div className="text-center text-sm-start">
                <span className="d-none d-sm-inline">Email Buyer :</span>
                <span className="d-inline-block text-line-1">
                  {order.email}
                </span>
              </div>
              <div className="font-nato d-flex justify-content-center justify-content-sm-start my-2">
                <span className="material-icons align-self-center me-1 text-primary">
                  account_circle
                </span>{" "}
                {detail.seller && detail.seller.name
                  ? detail.seller.name
                  : detail.seller}
                <span className="material-icons align-self-center ms-5 me-1 text-danger">
                  favorite
                </span>{" "}
                {order.product && order.product.rating}
              </div>
            </div>
          )}
        </div>
        <div className="my-3">
          <div className="title-2">History</div>
          {!order.orders_details && (
            <div className="d-flex flex-row justify-content-center">
              <Spinner animation="border" variant="primary" size="lg" />
            </div>
          )}
          {order.orders_details && loadHistory()}
        </div>
        {order.status == "Waiting" && order.seller_id == session.wallet && (
          <div
            className="d-flex flex-row align-self-end btn btn-primary"
            onClick={() => onConfirm("Confirmation")}
          >
            Confirmation
          </div>
        )}
        {order.status == "Confirmation" && order.buyer_id == session.wallet && (
          <div
            className="d-flex flex-row align-self-end btn btn-primary"
            onClick={() => onConfirm("Finished")}
          >
            Give Feedback
          </div>
        )}
        {order.status == "Finished" && order.seller_id == session.wallet && (
          <div
            className="d-flex flex-row align-self-end btn btn-primary"
            onClick={() => onClaim(order.price)}
          >
            Claim
          </div>
        )}
        {order.status == "Waiting" &&
          calculateDays(order.createdAt) >= 3 &&
          order.buyer_id == session.wallet && (
            <button
              className="btn btn-success d-flex flex-row align-self-end "
              onClick={() => refund(order.price)}
            >
              Refund
            </button>
          )}
        {(order.status == "Claimed" || order.status == "Refund") &&
          order.orders_details && (
            <div className=" row">
              <div className="col-sm-3 col-md-5 col-lg-7"></div>
              <div className="ms-sm-4 ms-md-6 col-12 col-sm-8 col-md-6 col-lg-4 d-flex flex-column p-4 rounded ">
                <div className="fw-bolder title-2">PRICE DETAIL</div>
                <hr></hr>
                <div className="d-flex flex-row justify-content-between">
                  <div className="fw-bold">Sub Total</div>

                  <div className="fw-bold">{order.price} BNB</div>
                </div>
                <div className="d-flex flex-row justify-content-between my-2 mb-3">
                  <div className="text-muted">Total Gas Fee</div>

                  <div className="fw-bold">
                    {
                      totalGas
                    } BNB
                  </div>
                </div>
                <hr className=""></hr>
                <div className="d-flex flex-row justify-content-between mb-4">
                  <div className="fw-bolder">Total Amount</div>

                  <div className="fw-bold">{totalGas + order.price} BNB</div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
export default OrderDetail;
