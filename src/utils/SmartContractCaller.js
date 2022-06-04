import MyContract from "../contracts/MyContract.json";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers, Contract } from "ethers";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const ConnectBlockchain = (bool) =>
  new Promise(async (res, rej) => {
    let provider = await detectEthereumProvider();

    if (bool) {
      if (provider) {
        sleep(10000).then(() => {
          const network = provider.network;
          if (!network) {
            alert("Please Using your VPN First for better experience");
          }
        });

        try {
          // change network to bsc testnet
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x61",
                chainName: "BSC-Testnet",
                rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18,
                },
              },
            ],
          });

          const accounts = await provider.request({
            method: "eth_requestAccounts",
          });
          const networkID = await provider.request({ method: "net_version" });

          provider = new ethers.providers.Web3Provider(provider);

          const signer = provider.getSigner();
          const address = await signer.getAddress();

          const myContract = new Contract(
            MyContract.networks[networkID].address,
            MyContract.abi,
            signer
          );
          const profil = await myContract.wallets(address);
          res({ myContract, wallet: address, provider, profil });
          return;
        } catch (error) {
          console.log(error);
          rej(error);
          alert("Login your Metamask, and Try to Refresh Page");
        }
      }
    } else {
      const networkID = 97;
      const connection = {
        url: "http://34.101.162.9:8088/",
        headers: {
          // "externalURL": "https://data-seed-prebsc-1-s1.binance.org:8545/",
          // "X-Forwarded-For": "203.0.113.195 , localhost:8080"
        },
      };
      // console.log("connection forwarded")
      // console.log(connection);
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          connection
        );
        //  const net= provider.connection
        // const net=await provider.detectNetwork()

        // console.log(net)

        sleep(10000).then(() => {
          const network = provider.network;
          if (!network) {
            alert("Please Using your VPN First for better experience");
          }
        });

        await provider.getNetwork();

        const address = null;
        const myContract = new Contract(
          MyContract.networks[networkID].address,
          MyContract.abi,
          provider
        );
        // console.log(myContract)
        res({ myContract, wallet: address });
      } catch (error) {
        console.log("error smartcontract");
        console.log(error);
        rej(error);
      }

      // return;
    }
  });
