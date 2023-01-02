import * as ed from "@noble/ed25519";
import base58check from "base58check";
import * as varint from "varint";
import { blake3 } from "@noble/hashes/blake3";

import {
  base58Encode,
  base58Decode,
  hashBlake3,
  varintEncode,
  getBytesPublicKey,
} from "./crypto.js";
import { ADDRESS_PREFIX, VERSION_NUMBER } from "./constants.js";

export async function isMassaSigner(message, pubkey, signature) {
  try {
    const version = Buffer.from(varintEncode(VERSION_NUMBER));

    const messageHashDigest = hashBlake3(Buffer.from(atob(message)));
    const publicKeyBase58Decoded = getBytesPublicKey(pubkey);
    // validate signature and retrieve address
    const isValid = await ed.verify(
      base58Decode(signature),
      messageHashDigest,
      publicKeyBase58Decoded
    );
    const address = await publicKeyToAddress(version, pubkey);
    return {
      result: isValid,
      address: address,
    };
  } catch (error) {
    console.log(error);
    return { result: false, address: null };
  }
}

async function publicKeyToAddress(version, publicKey) {
  try {
    const addressBase58Encoded =
      ADDRESS_PREFIX +
      base58Encode(Buffer.concat([version, hashBlake3(publicKey)]));
    return addressBase58Encoded;
  } catch (error) {
    return null;
  }
}
