const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const { verifySign } = require("./scripts/verifySign.js");

app.use(cors());
app.use(express.json());

const balances = {
  "06bb238a54e9a77d754172d28de7739186663e3f": 100,
  "94a72afd39c378f73c2d839083082a52ab03dc8c": 50,
  "57ce7cb667a36af2ef81f628aead83cc9b551fb8": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { sender, recipient, amount, userSign, recoveryBit } = req.body;

  try {
    const isSigned = await verifySign(sender, recipient, amount, userSign, recoveryBit);
    if (!isSigned) {
      res.status(400).send({ message: "Invalid signature!" });
      return;
    }      
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error });
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
