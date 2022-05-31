import { useEffect, useState } from "react";
import Save from "../utils/save";
import $ from "jquery";
import { useSelector } from "react-redux";
import { validate } from "../utils/validate";
import {  useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ProfileEdit() {
  const [data, setdata] = useState({
      name:"",
      email:"",
      profesi:""
  });
  const contract = useSelector(
    (session) => session.ContractReducers.contract.myContract
  );
  const wallet = useSelector(
    (session) => session.ContractReducers.contract.wallet
  );
  const navigate = useNavigate()
  const [file, setfile] = useState(null);
  const [imageDroped, setimageDroped] = useState(null);
  
  useEffect(() => {

    const getProfile=async()=>{
      const {email,name,photo,profesi} = await contract.wallets(wallet);
      setdata({email,name,photo,profesi})
  }
  if(wallet)
    getProfile()
  else{
    alert("Login Metamask First!")
    navigate("/");
  }
  }, [])
  
  const onUploadPhoto = () => {
    $("#fileupload").trigger("click");
  };
  const onDragFile = (evt) => {
    return false;
  };
  const onDragEnd = (evt) => {
    return false;
  };
  const uploadedChange = (file) => {
    const type = /image\/*/;
    if (file.type.match(type)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setfile(file);
        setdata({ ...data, photo: event.target.result });
        // setimageDroped(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
  const onChangeFile = (evt) => {
    const file = evt.target.files[0];
    uploadedChange(file);
  };
  const onDrop = (evt) => {
    evt.preventDefault();
    const file = evt.dataTransfer.files[0];
    uploadedChange(file);
  };
  const onSubmit = () => {
    const form = new FormData();

    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    form.append("file", file);
    if (validate()) {
      if (!pattern.test(data.email)) {
        Swal.fire({
          title: "Invalid Format Email",
          text: "Please Fill Email Correctly",
          icon: "error",
          timer: 1000,
        });
        return;
      }
      if(!file){
        Swal.fire({
            title: "Your Image Still Empty",
            text: "Please Upload an Image of Yours First!",
            icon: "error",
            timer: 1000,
          });
        return;
      }

      Save.post("/user/upload", form)
        .then(async(res) => {
          const { images } = res;
          await contract.registerAccount(data.name,images, data.email, data.profesi);
          navigate(0)
        })
        .catch((err) => {navigate(0)});
    }
  };
  return (
    <div className="container-xl p-5">
      <div className="d-flex flex-column my-2">
        <div className="btn-overlay-bottom align-self-center">
          <input
            title="File Image"
            className="file-dropped-area"
            accept="image/*"
            id="fileupload"
            src={file}
            onChange={onChangeFile}
            type="file"
            onDragOver={onDragFile}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
          ></input>
          <img
            className="img-card-circle align-self-center"
            src={data.photo ? data.photo : "/assets/images/profilTest.png"}
          ></img>
          <span className="bg-success d-inline">
            <i
              className="material-icons align-self-center p-3"
              style={{ cursor: "pointer" }}
              onClick={onUploadPhoto}
            >
              add_a_photo
            </i>
          </span>
        </div>
        <div className="width-responsive align-self-center">
          <div className="mb-3 ">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control required"
              title="Username"
              value={data.name}
              onChange={(evt) => setdata({ ...data, name: evt.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              value={data.email}
              title="Email Address"
              className="form-control required"
              onChange={(evt) => setdata({ ...data, email: evt.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Job Status
            </label>
            <input
              type="text"
              className="form-control required"
              title="Job Status"
              value={data.profesi}
              onChange={(evt) =>
                setdata({ ...data, profesi: evt.target.value })
              }
            />
          </div>

          <div className="d-flex flex-row justify-content-end">
            <span className="btn btn-primary" onClick={onSubmit}>
              Save Changes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileEdit;
