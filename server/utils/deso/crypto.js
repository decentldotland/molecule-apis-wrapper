import elliptic from "elliptic";
import bs58check from "bs58check";
import { ethers } from "ethers";
import base64url from "base64url";

const ec = new elliptic.ec("secp256k1");

export function desoAddressToPublicKey(address) {
  if (address.length < 5) {
    throw new Error("Failed to decode deso public key");
  }

  const decoded = bs58check.decode(address);
  const keypair = ec.keyFromPublic(Uint8Array.from(decoded).slice(3) , "array");

  return Buffer.from(keypair.getPublic().encode("array", false));
}

export function decodeDesoMessage(encodedMessage) {
  const decodedMessage = base64url.decode(encodedMessage);

  return ethers.utils.arrayify(ethers.utils.hashMessage(decodedMessage));
}

export function decodeDesoSignature(encodedSignature) {
  return Uint8Array.from(base64url.toBuffer(encodedSignature));
}
