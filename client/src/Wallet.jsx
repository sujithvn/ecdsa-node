import server from "./server";

function Wallet({ address, setAddress, userSign, setUserSign, recoveryBit, setRecoveryBit, balance, setBalance }) {
  async function onChangeAddr(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  async function onChangeSign(evt) {
    setUserSign(evt.target.value);
  }

  async function onChangeRecoveryBit(evt) {
    setRecoveryBit(parseInt(evt.target.value));
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChangeAddr}></input>
      </label>

      <label>
        Your Signature
        <input placeholder="Enter your Signature here" value={userSign} onChange={onChangeSign}></input>
      </label>

      <label>
        Recovery Bit
        <input placeholder="Enter the recovery bit" value={recoveryBit} onChange={onChangeRecoveryBit}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
