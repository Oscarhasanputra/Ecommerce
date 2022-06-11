import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Save from "../utils/save";
import SweetAlert from "sweetalert2";
import { Loader } from "../utils/loader";
import { useSelector } from "react-redux";
import { validate } from "../utils/validate";
function Selling() {
  const navigate = useNavigate();
  const [imageDroped, setimageDroped] = useState(null);
  const [productData, setproductData] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
  });
  const [file, setfile] = useState(null);
  const contract = useSelector(
    (state) => state.ContractReducers.contract.myContract
  );
  const session=useSelector(
    (state) => state.ContractReducers.contract
    )

  useEffect(() => {}, []);

  const onDragFile = (evt) => {
    console.log(productData.file);
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
        setimageDroped(event.target.result);
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
    // console.log(file)
    // console.log()
    uploadedChange(file);
  };

  const onSubmit = () => {
    const form = new FormData();

    form.append("file", file);

    if (file && validate()) {
      Loader.show();
      Save.post("/uploadfiles", form)
        .then(async (res) => {
          const { images } = res;
          const { name, description, category, price } = productData;
          const id = new Date().getTime();
          try {
           

            Loader.show("Initializing Wallet for Confirmation....")
            console.log(id);
           const tx = await contract.addProduct(
              id,
              name,
              description,
              price,
              category,
              images
            );

            console.log("transaction detail")
            console.log(tx)
            console.log(tx.value.toNumber())
            // Loader.show("Saving Data Product to Blockchain....")
            // const rc=await tx.wait()
            // console.log("response tx")
            // console.log(rc)
            // console.log(id)
            await Save.post("/product", {
              data: {id, name, price, category ,owner:session.wallet,txid:tx.hash},
            });
            Loader.hide();
            // SweetAlert.fire({
            //   icon: "success",
            //   title: "Success",
            //   text: "Product Has Been Added",
            //   timer: 1000,
            // }).then(() => {navigate(0)});
          } catch (error) {
            Loader.hide();
            SweetAlert.fire({
              icon: "error",
              title: "Failed",
              text: "Product Upload Failed",
              timer: 1000,
            }).then(() =>{navigate(0)});
          }
        })
        .catch((err) => {
          Loader.hide();
          SweetAlert.fire({
            icon: "error",
            title: "Failed",
            text: `Product Upload Failed`,
            timer: 1000,
          });
          navigate(0)
        });
    }
  };
  return (
    <div className="container-xl py-5 px-5">
      <div className="title-1"> Create Your Own Product</div>
      <div className="title-2 my-2"> Upload Your Thumbnail Product</div>
      <div className="my-2"> Files Supported Types: JPG, PNG, JPEG.</div>
      <div className="file-area">
        <input
          title="File Image"
          accept="image/*"
          id="fileupload"
          required="required"
          src={file}
          onChange={onChangeFile}
          type="file"
          onDragOver={onDragFile}
          onDragEnd={onDragEnd}
          onDrop={onDrop}
        ></input>
        <div className="file-dummy">
          <div id="dummyImage" className={imageDroped ? "d-none" : ""}>
            <img src="/assets/images//upload-photo.png"></img>
            <div>Please Select your image</div>
          </div>
          <div id="resultImage" className={imageDroped ? "" : "d-none"}>
            <img src={imageDroped} style={{ width: "100%" }} />
          </div>
        </div>
      </div>
      <label className="form-label">Product Name</label>
      <input
        className="form-control mb-4 w-70 required"
        type="text"
        title="Product Name"
        placeholder="Product Name"
        aria-label="default input example"
        value={productData.name}
        onChange={(evt) => {
          const data = { ...productData, name: evt.target.value };
          setproductData(data);
        }}
      />

      <label className="form-label">Product Category</label>
      <select
        title="Product Category"
        value={productData.category}
        onChange={(evt) => {
          const data = { ...productData, category: evt.target.value };
          setproductData(data);
        }}
        className="form-select w-70 mb-2 required"
        aria-label=""
      >
        <option value="">Product Category</option>
        <option value="E-Book">E-Book</option>
        <option value="Photo">Photo</option>
        <option value="Music">Music</option>
        <option value="Design">Design</option>
        <option value="Others">Others</option>
      </select>

      <label className="form-label">Product Price</label>
      <div className="row w-70 ms-1 justify-content-between">
        <div
          className="col-4 col-md-2 border-1 corner-rounded px-2 py-2 d-flex flex-row justify-content-center"
          style={{ backgroundColor: "#d0d0d9" }}
        >
          {/* <img src="/assets/images/ADA.png" height="25px"></img> */}
          <span className="title-2 align-self-center" style={{ fontSize: 16 }}>
            Rupiah
          </span>
        </div>
        <input
          type="number"
          className="col-7 col-md-9 ms-1 rounded-3 p-2 card-search border-1 "
          title="Product Price"
          placeholder="Price"
          value={productData.price}
          onChange={(evt) => {
            const data = { ...productData, price: evt.target.value };
            setproductData(data);
          }}
        ></input>
        {/* <div className="col-8 corner-rounded px-2 py-3 "> a
          <input className="bg-danger"></input>
        </div> */}
        {/* <input
          className="col-8 form-no-width mb-4 required"
          style={{width:"none"}}
          type="text"
          title="Product Price"
          placeholder="Price"
          aria-label="default input example"
          value={productData.name}
          onChange={(evt) => {
            const data = { ...productData, name: evt.target.value };
            setproductData(data);
          }}
        /> */}
      </div>

      <label className="form-label">Product Description</label>
      <div className="form-floating w-70 mb-4">
        <textarea
          className="form-control required"
          title="Product Description"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          style={{ height: 100 }}
          onChange={(evt) => {
            const data = { ...productData, description: evt.target.value };
            setproductData(data);
          }}
        ></textarea>
        <label htmlFor="floatingTextarea">Description</label>
      </div>
      <button
        className="py-2 px-5 text-white green btn-rounded"
        onClick={onSubmit}
      >
        Create
      </button>
    </div>
  );
}

export default Selling;
