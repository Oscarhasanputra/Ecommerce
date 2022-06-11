import MyContract from "../contracts/MyContract.json";
import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnectProvider from "@walletconnect/web3-provider";
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
                chainName: "Comercy",
                rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18,
                },
              },
            ],
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
          // console.log(error);
          rej(error);
          alert("Failed Login to Wallet and Try to Refresh Page");
        }
      } else {
        provider = new WalletConnectProvider({
          infuraId: "27e484dcd9e3efcfd25a83a78777cdf1", // Required
          rpc: {
            97: "https://comercy.site:2053/",
          },
        });
        await provider.enable();
        try {
          // change network to bsc testnet
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x61",
                chainName: "Comercy",
                rpcUrls: ["https://comercy.site:2053/"],
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18,
                },
              },
            ],
          });
          
          const networkID = provider.chainId

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
          // console.log(error);
          rej(error);
          alert("Failed Login to Wallet and Try to Refresh Page");
        }
        // end else
      }
    } else {
      const networkID = 97;
      
      
      try {
        const provider = new ethers.providers.JsonRpcProvider("https://comercy.site:2053/");
        
       
        

        await provider.getNetwork();

        const address = null;
        const myContract = new Contract(
          MyContract.networks[networkID].address,
          MyContract.abi,
          provider
        );
        res({ myContract, wallet: address });
      } catch (error) {
        
        rej(error);
      }

      // return;
    }
  });
