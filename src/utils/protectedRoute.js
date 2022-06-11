import { Navigate, Route, Outlet, useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";
import { ConnectBlockchain } from "./SmartContractCaller";
import $ from "jquery";
import { connect, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
function ProtectedRoute({ validated, path, Component, ...props }) {
  const contract = useSelector((state) => state.ContractReducers.contract);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem("login");

    if (contract.myContract) {
      if (!contract.myContract || !contract.wallet) {
        alert("Login Metamask Firs!");
        navigate("/");
      } else {
        if (contract.profil && !contract.profil.name) {
          Swal.fire({
            title: "Let`s Update Your Profil",
            icon: "info",
            timer: 1000,
          })
            .then((res) => {
              navigate("/profile/edit");
            })
            .catch((err) => {});
        }
      }
    }
  }, [contract]);

  return Component;
}
const mapToProps = (state) => {
  return {
    session: state,
  };
};
const dispatchToProps = (dispatch) => {
  return {
    save: (contract) => dispatch({ type: "save", contract }),
    logout: () => dispatch({ type: "update", date: 0 }),
  };
};
export default connect(mapToProps, dispatchToProps)(ProtectedRoute);
