const http = require("http");
const url = require("url");
var express = require("express");
var app = express();
const cookieParser = require("cookie-parser")
const cluster = require("cluster")
const numCPUs = require('os').cpus().length;
const axios =require("axios")
const cors = require("cors");
const createProxyMiddleware = require("http-proxy-middleware");
let index=0;
const urls=[
  "https://data-seed-prebsc-1-s1.binance.org:8545/",
  "https://data-seed-prebsc-2-s1.binance.org:8545/",
  "https://data-seed-prebsc-1-s3.binance.org:8545/",
  "https://data-seed-prebsc-2-s3.binance.org:8545/",
]
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const parseIncomingRequest = (clientRequest, clientResponse) => {
  const requestToFulfil = url.parse(
    "https://data-seed-prebsc-1-s1.binance.org:8545"
  );

  const options = {
    port: 8545,
    host: "data-seed-prebsc-1-s1.binance.org",
    path: "/",
    strict: true,
  };

  // const options = {
  //     method: "POST",
  //     headers: clientRequest.headers,
  //     host: "https://data-seed-prebsc-1-s1.binance.org:8545",
  //     port: 8545,
  //     searchParams:
  //     path: "/",
  //   };
  //console.log("parse incoming request");
  //console.log(index)
  executeRequest(options, clientRequest, clientResponse);
};

const executeRequest = (options, clientRequest, clientResponse) => {
  // http.request({})
  const urlReq= urls[index];
  
  // if (clientRequest.method == "POST")
    axios
      .post(
        urlReq,
        JSON.stringify(clientRequest.body),
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        // //console.log(res)
        clientResponse.send(res.data);
      })
      .catch((err) => {
        //console.log(err)
        index = (index+1) < 3?index+1:0;
        executeRequest(options,clientRequest,clientResponse)
        // clientResponse.send(err);
      });
};

// app.use(parseIncomingRequest);

// app.
if (cluster.isMaster) {
  //console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  //Check if work id is died
  cluster.on('exit', (worker, code, signal) => {
    //console.log(`worker ${worker.process.pid} died`);
  });

}else{
  //console.log(`Worker ${process.pid} started`);
  const server = http.createServer(app);
  app.use(parseIncomingRequest);
  // app.use(createProxyMiddleware({ target: 'https://data-seed-prebsc-1-s1.binance.org:8545/', changeOrigin: true }))
  
  server.listen(8088, () => {
    //console.log("Proxy Server listening on Port 8088");
  });
}

