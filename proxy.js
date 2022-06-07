const http = require("http");
const request = require("request");
const url = require("url");
const Axios = require("axios");
var express = require("express");
var cookieParser = require("cookie-parser");
var path = require("path");
var app = express();
var logger = require("morgan");
const cors = require("cors");
const { default: axios } = require("axios");
var rpc = require('node-json-rpc');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const parseIncomingRequest = (clientRequest, clientResponse) => {
  const requestToFulfil = url.parse(
    "https://data-seed-prebsc-1-s1.binance.org:8545"
  );
  
  // Frame the request to be forwarded via Backend to External Source
  // const options = {
  //   method: "POST",
  //   headers: clientRequest.headers,
  //   host: requestToFulfil.hostname,
  //   port: requestToFulfil.port || 80,
  //   path: requestToFulfil.path,
  // };
    const options = {
      port:8545,
      host:"data-seed-prebsc-1-s1.binance.org",
      path:"/",
      strict:true
    }

  // const options = {
  //     method: "POST",
  //     headers: clientRequest.headers,
  //     host: "https://data-seed-prebsc-1-s1.binance.org:8545",
  //     port: 8545,
  //     searchParams:
  //     path: "/",
  //   };
  console.log("parse incoming request");

  executeRequest(options, clientRequest, clientResponse);
};

const executeRequest = (options, clientRequest, clientResponse) => {
  // http.request({})
  
  axios.post("https://data-seed-prebsc-1-s1.binance.org:8545/",JSON.stringify(clientRequest.body),{
    headers:{
      "content-type": "application/json"
    }
  }).then(res=>{
    clientResponse.send(res.data)
    console.log(res)
  }).catch(err=>{
    console.log("error")
    console.log(err)
  })
  // const externalRequest = http.request(options, (externalResponse) => {
  //   // Write Headers to clientResponse
  //   clientResponse.writeHead(
  //     externalResponse.statusCode,
  //     externalResponse.headers
  //   );
  //   console.log("response");
  //   console.log(externalResponse);
  //   // Forward the data being received from external source back to client
  //   externalResponse.on("data", (chunk) => {
  //     console.log("data send to client ", chunk.toString());
  //     clientResponse.write(chunk);
  //   });

  //   // End the client response when the request from external source has completed
  //   externalResponse.on("end", () => {
  //     clientResponse.end();
  //   });
  // });

  // // Map data coming from client request to the external request being made
  // clientRequest.on("data", (chunk) => {
  //   console.log("data send from client ", chunk.toString());
  //   externalRequest.write(chunk);
  // });

  // // Map the end of client request to the external request being made
  // clientRequest.on("end", () => {
  //   externalRequest.end();
  // });
  // console.log("request send ");
  // console.log(JSON.stringify(clientRequest.body));
  // externalRequest.write(JSON.stringify(clientRequest.body));
  // externalRequest.end();
};

// Create a HTTP server
// app.use("/",(req,res)=>{
//     console.log(req.method)
//     console.log(req.body)
// })

app.use(parseIncomingRequest);
// app.
const server = http.createServer(app);
server.listen(8088, () => {
  console.log("Proxy Server listening on Port 8088");
});
