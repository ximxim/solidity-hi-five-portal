import * as React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const wave = () => {
    
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am Azim and I worked on react native mobile apps so that's pretty cool right? Connect your Ethereum wallet and send a HiFive to me!
        </div>

        <button className="hiFiveButton" onClick={wave}>
          Send me a HiFive
        </button>
      </div>
    </div>
  );
}
