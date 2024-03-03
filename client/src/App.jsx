import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [userSign, setUserSign] = useState("");
  const [recoveryBit, setRecoveryBit] = useState(0);

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        userSign={userSign}
        setUserSign={setUserSign}
        recoveryBit={recoveryBit}
        setRecoveryBit={setRecoveryBit}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} userSign={userSign} recoveryBit={recoveryBit} />
    </div>
  );
}

export default App;
