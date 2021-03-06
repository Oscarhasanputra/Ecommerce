import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";

import { Spinner } from "react-bootstrap";
import ProtectedRoute from "./utils/protectedRoute";
import loadable from "react-loadable";
// import
function LoadingComp() {
  return <Spinner animation="border" size="lg" variant="primary" />;
}

const Header = loadable({
  loader: () => import("./Header"),
  loading: LoadingComp,
});
const Dashboard = loadable({
  loader: () => import("./views/Dashboard"),
  loading: LoadingComp,
});
const Market = loadable({
  loader: () => import("./views/Market"),
  loading: LoadingComp,
});
const Selling = loadable({
  loader: () => import("./views/Selling"),
  loading: LoadingComp,
});
const Profile = loadable({
  loader: () => import("./views/Profile"),
  loading: LoadingComp,
});
const Detail = loadable({
  loader: () => import("./views/Detail"),
  loading: LoadingComp,
});
const OrderDetail = loadable({
  loader: () => import("./views/OrderDetail"),
  loading: LoadingComp,
});
const Cart = loadable({
  loader: () => import("./views/Cart"),
  loading: LoadingComp,
});
const ProfileEdit = loadable({
  loader: () => import("./views/ProfileEdit"),
  loading: LoadingComp,
});
const EditItem = loadable({
  loader: () => import("./views/EditItem"),
  loading: LoadingComp,
});
const Notification = loadable({
  loader: () => import("./views/Notifications"),
  loading: LoadingComp,
});
const Chat = loadable({
  loader: () => import("./views/Chat/Chat"),
  loading: LoadingComp,
});

export default function RouterFs() {
  // const wallet=null;
  //console.log("hello world");
  // //console.log(session.isAuth())
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" exact element={<Dashboard />}></Route>
          <Route
            path="/market"
            element={
              //

              <Market />
            }
          ></Route>
          <Route
            path="/chat/:id"
            element={
              //


              <ProtectedRoute Component={ <Chat />}></ProtectedRoute>
            }
          ></Route>
          <Route
            path="/chat"
            element={
              //

              <ProtectedRoute Component={ <Chat />}></ProtectedRoute>
             
            }
          ></Route>

          <Route
            path="/sell"
            element={<ProtectedRoute Component={<Selling />}></ProtectedRoute>}
          ></Route>

          {/* <ProtectedRoute validated={wallet}>
              
            </ProtectedRoute> */}
          <Route path="/profile/edit" exact element={<ProfileEdit />}></Route>
          <Route
            path="/profile"
            exact
            element={<ProtectedRoute Component={<Profile />}></ProtectedRoute>}
          ></Route>

          <Route
            path="/order/:id"
            element={
              <ProtectedRoute Component={<OrderDetail />}></ProtectedRoute>
            }
          />

          <Route
            path="/item/:id"
            element={
              //

              <Detail />
            }
          />

          <Route
            path="/edit/:id"
            element={<ProtectedRoute Component={<EditItem />}></ProtectedRoute>}
          />

          <Route
            path="/cart"
            element={<ProtectedRoute Component={<Cart />}></ProtectedRoute>}
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute Component={<Notification />}></ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
