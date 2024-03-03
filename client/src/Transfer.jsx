import { useState } from "react";
import server from "./server";

function Transfer({ address, setBalance, userSign, recoveryBit }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    if (!address || !sendAmount || !recipient || !userSign) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        userSign,
        recoveryBit: parseInt(recoveryBit),
      });
      setBalance(balance);
      alert("Transfer successful! Your balance is now " + balance);
    } catch (ex) {
      let error = ex?.response?.data?.message || ex?.message || "Error in transfer!";
      console.log(ex);
      alert(error);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
