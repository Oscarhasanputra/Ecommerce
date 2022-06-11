const http = require("http");
const url = require("url");
var express = require("express");
var app = express();
const cors = require("cors");
const createProxyMiddleware = require("http-proxy-middleware");

app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

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
  console.log("parse incoming request");
  console.log(clientRequest.headers);
  executeRequest(options, clientRequest, clientResponse);
};

const executeRequest = (options, clientRequest, clientResponse) => {
  // http.request({})
  // if (clientRequest.method == "POST")
    axios
      .post(
        "https://data-seed-prebsc-1-s1.binance.org:8545/",
        JSON.stringify(clientRequest.body),
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res)
        clientResponse.send(res.data);
      })
      .catch((err) => {
        console.log(err)
        clientResponse.send(err);
      });
};

app.use(createProxyMiddleware({ target: 'https://data-seed-prebsc-1-s1.binance.org:8545/', changeOrigin: true }))
// app.use(parseIncomingRequest);

// app.
const server = http.createServer(app);
server.listen(8088, () => {
  console.log("Proxy Server listening on Port 8088");
});
