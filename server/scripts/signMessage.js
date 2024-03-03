const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const PRIVATE_KEY = "23ad2f4ea4e18b257ba4f9e1533321ff36bb634281540fbb93a14bc1e908c423";
const AMOUNT_TO_SEND = '15';
const RECIPIENT_ADDRESS = "94a72afd39c378f73c2d839083082a52ab03dc8c";

// hashMessage.js
function hashMessage(message) {
    return keccak256(utf8ToBytes(message));
}

// signMessage.js
async function signMessage() {
    const msg = `${AMOUNT_TO_SEND}_${RECIPIENT_ADDRESS}`;
    const hashedMsg = hashMessage(msg);
    return secp.sign(hashedMsg, PRIVATE_KEY, {recovered: true})
}

(async () => {
    const [sig, recoveryBit] = await signMessage();
    const userSign = toHex(sig);
    console.log({userSign, recoveryBit});
})();
