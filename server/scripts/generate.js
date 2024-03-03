const secp256k1 = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

// generate a new private key
const newPrivateKey = secp256k1.utils.randomPrivateKey();
console.log("----------- New Private Key -----------");
console.log(toHex(newPrivateKey));

const newPublicKey = secp256k1.getPublicKey(newPrivateKey);

// getAddress.js (to get address from public key)
function getAddress(publicKey) {
    return keccak256(publicKey.slice(1,)).slice(-20,);
}

const newAddress = getAddress(newPublicKey);
console.log("----------- New Address -----------");
console.log(toHex(newAddress));
