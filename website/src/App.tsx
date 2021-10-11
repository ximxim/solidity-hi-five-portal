import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import abi from "./utils/HiFivePortal.json";

const contractAddress = "0x8cC43204976FbC4F7E7A592F72a1c46594f07939";
const contractABI = abi.abi;

export default function App() {
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [totalHiFives, setTotalHiFives] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window as any;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const hiFive = async () => {
    setIsLoading(true);

    try {
      const { ethereum } = window as any;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const hiFivePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await hiFivePortalContract.getTotalHiFives();
        console.log("Retrieved total HiFives count...", count.toNumber());

        const waveTxn = await hiFivePortalContract.hiFive();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await hiFivePortalContract.getTotalHiFives();
        setTotalHiFives(count.toNumber());
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalHighFives = async () => {
    try {
      const { ethereum } = window as any;
      
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const hiFivePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
    
        let count = await hiFivePortalContract.getTotalHiFives();
        setTotalHiFives(count.toNumber());
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (!currentAccount) return;

    getTotalHighFives();
  }, [currentAccount]);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">{totalHiFives === 0 ? '👋 Hey there!' : `I have received ${totalHiFives} high fives, thanks all`}</div>

        <div className="bio">
          I am Azim and I worked on react native mobile apps so that's pretty
          cool right? Connect your Ethereum wallet and send a HiFive to me!
        </div>

        <button className="hiFiveButton" onClick={hiFive}>
          {isLoading ? 'Sending...' : 'Send me a HiFive'}
        </button>
        {!currentAccount && (
          <button className="hiFiveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
