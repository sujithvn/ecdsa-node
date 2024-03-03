## ECDSA Node

Note: Student notes (implementation details follows right after the below instruction section)

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

### Implementation
Added few scripts and the functionality to verify signature. Please follow the below steps:
1. Run the script `./scripts/generate.js` to generate new PrivateKays and associated address (if required).
2. To mock a wallet that works locally without interacting with server (to ensure we are not sending privatekey over net), we have a script `./scripts/signMessage.js` that takes the private-key, amount, recipient-address as inputs and returns a signature and the recovery-bit.
3. Headover to front-end and input the same sender-address, recipient-address, amount, signature and recovery-bit. Hit transfer to transfer the amount.
4. The `verifySign` functionality will verify the signature to make sure the above values match and the sender-address has generated the right signature.

### Add-ons for later
* Implement/Convert the address generation and Signing scripts into UI screens
* Block the current balance to be displayed and show only when signature is verified.
