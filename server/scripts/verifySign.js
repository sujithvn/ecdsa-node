const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

//recoverKey.js
async function recoverKey(message, signature, recoveryBit) {
    return secp.recoverPublicKey((message), signature, recoveryBit)
}

// getAddress.js (to get address from public key)
function getAddress(publicKey) {
    // const keyFormat = publicKey.slice(0,1);
    const remainingPublic = publicKey.slice(1,);
    const hashedPublic = keccak256(remainingPublic);
    return hashedPublic.slice(-20,);
}

module.exports.verifySign = async function verifySign(sender, recipient, amountData, userSign, recoveryBit) {
    let isSigned = false;
    try {
        const messageHash = keccak256(utf8ToBytes(`${amountData}_${recipient}`));
        const publicKey = await recoverKey(messageHash, userSign, recoveryBit);
        const address = getAddress(publicKey);
        const isSignedVerified = secp.verify(userSign, messageHash, publicKey);
        isSigned = (toHex(address) === sender && isSignedVerified);
    } catch (error) {
        console.log('Error in verifySign function.....');
        console.log(error);
        console.log('---------------------------')
    }
    return isSigned;
}
