import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";

export default function App() {
  const [currentAccount, setCurrentAccount] = useState<string>('');

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window as any;
  
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
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

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }

  const wave = () => {};

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">👋 Hey there!</div>

        <div className="bio">
          I am Azim and I worked on react native mobile apps so that's pretty
          cool right? Connect your Ethereum wallet and send a HiFive to me!
        </div>

        <button className="hiFiveButton" onClick={wave}>
          Send me a HiFive
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
